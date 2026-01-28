const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    displayName: { type: String, default: '' },
    bio: { type: String, default: '', maxlength: 500 },
    location: { type: String, default: '' },
    website: { type: String, default: '' },
    avatar: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    skillsHave: [{ type: String }],
    skillsWant: [{ type: String }]
})

const User = mongoose.model('User', userSchema);

module.exports = User;
