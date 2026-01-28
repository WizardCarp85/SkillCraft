const mongoose = require('mongoose');
const { Schema } = mongoose;

const connectionSchema = new Schema({
    // Who sent the request
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // Who received the request
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    
    // What skill the sender will teach
    skillOffered: { type: String, required: true },
    
    // What skill the sender wants to learn
    skillRequested: { type: String, required: true },
    
    // Request status
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected'], 
        default: 'pending' 
    },
    
    // Timestamps
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const Connection = mongoose.model('Connection', connectionSchema);

module.exports = Connection;