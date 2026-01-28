const express = require('express');
const router = express.Router();
const {
    updateProfile,
    getAllUsers,
    getUserById,
    getMyProfile,
    getMatches
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

// Protected routes
router.get('/me', authMiddleware, getMyProfile);
router.put('/profile', authMiddleware, updateProfile);
router.get('/matches', authMiddleware, getMatches);
router.get('/:id', authMiddleware, getUserById);
router.get('/', authMiddleware, getAllUsers);

module.exports = router;