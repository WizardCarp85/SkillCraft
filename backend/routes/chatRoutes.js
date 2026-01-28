const express = require('express');
const router = express.Router();
const {
    sendMessage,
    getMessages,
    getUnreadCount,
    getConversations,
    markAsRead
} = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected
router.post('/send', authMiddleware, sendMessage);
router.get('/conversations', authMiddleware, getConversations);
router.get('/unread', authMiddleware, getUnreadCount);
router.get('/:connectionId', authMiddleware, getMessages);
router.put('/:connectionId/read', authMiddleware, markAsRead);

module.exports = router;
