const express = require('express');
const router = express.Router();
const {
    sendRequest,
    getReceivedRequests,
    getSentRequests,
    respondToRequest,
    getMyConnections
} = require('../controllers/connectionController');
const authMiddleware = require('../middleware/authMiddleware');

// All routes are protected
router.post('/', authMiddleware, sendRequest);
router.get('/received', authMiddleware, getReceivedRequests);
router.get('/sent', authMiddleware, getSentRequests);
router.get('/active', authMiddleware, getMyConnections);
router.put('/:connectionId', authMiddleware, respondToRequest);

module.exports = router;
