const Connection = require('../model/Connection');

// Send a connection request
const sendRequest = async (req, res) => {
    try {
        const senderId = req.user.userId;
        const { receiverId, skillOffered, skillRequested } = req.body;

        // Can't send request to yourself
        if (senderId === receiverId) {
            return res.status(400).json({ message: "Can't connect with yourself" });
        }

        // Check if connection already exists
        const existingConnection = await Connection.findOne({
            $or: [
                { sender: senderId, receiver: receiverId },
                { sender: receiverId, receiver: senderId }
            ]
        });

        if (existingConnection) {
            return res.status(400).json({ message: 'Connection already exists' });
        }

        const connection = new Connection({
            sender: senderId,
            receiver: receiverId,
            skillOffered,
            skillRequested
        });

        await connection.save();

        res.status(201).json({
            message: 'Connection request sent',
            connection
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all pending requests received
const getReceivedRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requests = await Connection.find({
            receiver: userId,
            status: 'pending'
        }).populate('sender', 'username email skillsHave skillsWant');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all requests sent by user
const getSentRequests = async (req, res) => {
    try {
        const userId = req.user.userId;

        const requests = await Connection.find({
            sender: userId
        }).populate('receiver', 'username email skillsHave skillsWant');

        res.status(200).json(requests);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Accept or reject a request
const respondToRequest = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { connectionId } = req.params;
        const { status } = req.body; // 'accepted' or 'rejected'

        if (!['accepted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const connection = await Connection.findById(connectionId);

        if (!connection) {
            return res.status(404).json({ message: 'Connection not found' });
        }

        // Only receiver can respond
        if (connection.receiver.toString() !== userId) {
            return res.status(403).json({ message: 'Not authorized' });
        }

        connection.status = status;
        connection.updatedAt = Date.now();
        await connection.save();

        res.status(200).json({
            message: `Request ${status}`,
            connection
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all accepted connections (active swaps)
const getMyConnections = async (req, res) => {
    try {
        const userId = req.user.userId;

        const connections = await Connection.find({
            $or: [{ sender: userId }, { receiver: userId }],
            status: 'accepted'
        })
        .populate('sender', 'username email skillsHave skillsWant')
        .populate('receiver', 'username email skillsHave skillsWant');

        res.status(200).json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    sendRequest,
    getReceivedRequests,
    getSentRequests,
    respondToRequest,
    getMyConnections
};
