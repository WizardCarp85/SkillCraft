require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    }
});

const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors({
    origin: '*',
    credentials: true
}));
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const connectionRoutes = require('./routes/connectionRoutes');
const chatRoutes = require('./routes/chatRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/connections', connectionRoutes);
app.use('/api/chat', chatRoutes);

// Socket.io for real-time chat
const onlineUsers = new Map();

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    // User joins with their userId
    socket.on('join', (userId) => {
        onlineUsers.set(userId, socket.id);
        console.log(`User ${userId} is online`);
    });

    // Handle sending messages
    socket.on('sendMessage', (data) => {
        const { receiverId, message } = data;
        const receiverSocket = onlineUsers.get(receiverId);
        
        if (receiverSocket) {
            io.to(receiverSocket).emit('receiveMessage', message);
        }
    });

    // Handle typing indicator
    socket.on('typing', (data) => {
        const { receiverId, userId } = data;
        const receiverSocket = onlineUsers.get(receiverId);
        
        if (receiverSocket) {
            io.to(receiverSocket).emit('userTyping', userId);
        }
    });

    socket.on('disconnect', () => {
        // Remove user from online users
        for (const [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                console.log(`User ${userId} disconnected`);
                break;
            }
        }
    });
});

// Connect to database and start server
connectDB();

server.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});

module.exports = { io };