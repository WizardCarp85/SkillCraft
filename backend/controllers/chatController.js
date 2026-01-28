const Message = require('../model/Message');
const Connection = require('../model/Connection');

// Send a message
const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const { connectionId, receiverId, content, messageType = 'text' } = req.body;

        // Verify connection exists and is accepted
        const connection = await Connection.findById(connectionId);
        
        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        if (connection.status !== 'accepted') {
            return res.status(403).json({ message: 'Cannot message - connection not accepted' });
        }

        // Verify sender is part of this connection
        const isPartOfConnection = 
            connection.sender.toString() === senderId || 
            connection.receiver.toString() === senderId;

        if (!isPartOfConnection) {
            return res.status(403).json({ message: 'Not authorized to send message in this connection' });
        }

        const message = new Message({
            connectionId,
            sender: senderId,
            receiver: receiverId,
            content,
            messageType
        });

        await message.save();

        // Populate sender info for response
        await message.populate('sender', 'username');

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all messages for a connection
const getMessages = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { connectionId } = req.params;
        const { page = 1, limit = 50 } = req.query;

        // Verify connection exists
        const connection = await Connection.findById(connectionId);
        
        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        // Verify user is part of this connection
        const isPartOfConnection = 
            connection.sender.toString() === userId || 
            connection.receiver.toString() === userId;

        if (!isPartOfConnection) {
            return res.status(403).json({ message: 'Not authorized to view these messages' });
        }

        const messages = await Message.find({ connectionId })
            .populate('sender', 'username')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Mark messages as read
        await Message.updateMany(
            { 
                connectionId, 
                receiver: userId, 
                isRead: false 
            },
            { isRead: true }
        );

        res.status(200).json(messages.reverse());
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get unread message count
const getUnreadCount = async (req, res) => {
    try {
        const userId = req.user.userId;

        const unreadCount = await Message.countDocuments({
            receiver: userId,
            isRead: false
        });

        res.status(200).json({ unreadCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all conversations (connections with last message)
const getConversations = async (req, res) => {
    try {
        const userId = req.user.userId;

        // Get all accepted connections
        const connections = await Connection.find({
            $or: [{ sender: userId }, { receiver: userId }],
            status: 'accepted'
        })
        .populate('sender', 'username email')
        .populate('receiver', 'username email');

        // Get last message and unread count for each connection
        const conversations = await Promise.all(
            connections.map(async (connection) => {
                const lastMessage = await Message.findOne({ connectionId: connection._id })
                    .sort({ createdAt: -1 });

                const unreadCount = await Message.countDocuments({
                    connectionId: connection._id,
                    receiver: userId,
                    isRead: false
                });

                // Determine the other user
                const otherUser = connection.sender._id.toString() === userId 
                    ? connection.receiver 
                    : connection.sender;

                return {
                    connectionId: connection._id,
                    otherUser,
                    skillOffered: connection.skillOffered,
                    skillRequested: connection.skillRequested,
                    lastMessage: lastMessage ? {
                        content: lastMessage.content,
                        createdAt: lastMessage.createdAt,
                        isFromMe: lastMessage.sender.toString() === userId
                    } : null,
                    unreadCount
                };
            })
        );

        // Sort by last message time
        conversations.sort((a, b) => {
            if (!a.lastMessage) return 1;
            if (!b.lastMessage) return -1;
            return new Date(b.lastMessage.createdAt) - new Date(a.lastMessage.createdAt);
        });

        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Mark messages as read
const markAsRead = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { connectionId } = req.params;

        await Message.updateMany(
            { 
                connectionId, 
                receiver: userId, 
                isRead: false 
            },
            { isRead: true }
        );

        res.status(200).json({ message: 'Messages marked as read' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    sendMessage,
    getMessages,
    getUnreadCount,
    getConversations,
    markAsRead
};
