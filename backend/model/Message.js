const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = new Schema({
    // The connection this message belongs to
    connectionId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Connection', 
        required: true 
    },
    
    // Who sent the message
    sender: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // Who receives the message
    receiver: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    
    // Message content
    content: { 
        type: String, 
        required: true 
    },
    
    // Message type (text, image, file)
    messageType: { 
        type: String, 
        enum: ['text', 'image', 'file'], 
        default: 'text' 
    },
    
    // Read status
    isRead: { 
        type: Boolean, 
        default: false 
    },
    
    // Timestamp
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

// Index for faster queries
messageSchema.index({ connectionId: 1, createdAt: -1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
