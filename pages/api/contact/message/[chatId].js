

import db from '@/database/connection';
import Chat from '@/database/model/Contact/Chat';
import Message from '@/database/model/Contact/Message';

import nc from 'next-connect'
const handler = nc()



// ✅ Get messages of a chat
handler.get(async (req, res) => {
    try {
        await db.connect()
        const messages = await Message.find({ chatId: req.query.chatId }).populate('sender', 'name email');
        await db.disconnect()
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




export default handler