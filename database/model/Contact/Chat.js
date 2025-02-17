
import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Users in the chat
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: false }, // Related order
    lastMessage: { type: String }, // Preview of last message
    lastMessageAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
  });
  
  const Chat =
  mongoose.models.Chat || mongoose.model('Chat', ChatSchema)
export default Chat
  