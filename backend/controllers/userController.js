const User = require('../model/User');

// Update user's profile
const updateProfile = async (req, res) => {
    try {
        const { skillsHave, skillsWant, displayName, bio, location, website, avatar } = req.body;
        const userId = req.user.userId;

        const updateData = {};
        if (skillsHave !== undefined) updateData.skillsHave = skillsHave;
        if (skillsWant !== undefined) updateData.skillsWant = skillsWant;
        if (displayName !== undefined) updateData.displayName = displayName;
        if (bio !== undefined) updateData.bio = bio;
        if (location !== undefined) updateData.location = location;
        if (website !== undefined) updateData.website = website;
        if (avatar !== undefined) updateData.avatar = avatar;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            { new: true }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all users (excluding current user)
const getAllUsers = async (req, res) => {
    try {
        const userId = req.user.userId;
        const users = await User.find({ _id: { $ne: userId } }).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get user by ID
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get current user's profile
const getMyProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Find matching users based on skills
const getMatches = async (req, res) => {
    try {
        const userId = req.user.userId;
        const currentUser = await User.findById(userId);

        if (!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find users who have skills I want
        const matches = await User.find({
            _id: { $ne: userId },
            skillsHave: { $in: currentUser.skillsWant }
        }).select('-password');

        // Sort by mutual match (they also want what I have)
        const scoredMatches = matches.map(user => {
            const theyHaveWhatIWant = user.skillsHave.filter(skill => 
                currentUser.skillsWant.includes(skill)
            ).length;
            
            const iHaveWhatTheyWant = currentUser.skillsHave.filter(skill => 
                user.skillsWant.includes(skill)
            ).length;

            return {
                user,
                score: theyHaveWhatIWant + iHaveWhatTheyWant,
                mutualMatch: iHaveWhatTheyWant > 0
            };
        });

        // Sort by score (mutual matches first)
        scoredMatches.sort((a, b) => b.score - a.score);

        res.status(200).json(scoredMatches);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    updateProfile,
    getAllUsers,
    getUserById,
    getMyProfile,
    getMatches
}; 