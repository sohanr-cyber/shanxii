
import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'Chat', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String },
    attachments: [{ type: String }], // Array of URLs (images, files, etc.)
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users who read the message
    createdAt: { type: Date, default: Date.now }
});

const Message =
  mongoose.models.Message || mongoose.model('Message', MessageSchema)
export default Message
