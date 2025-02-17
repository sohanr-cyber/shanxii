

import db from '@/database/connection';
import Chat from '@/database/model/Contact/Chat';
import Message from '@/database/model/Contact/Message';

import nc from 'next-connect'
const handler = nc()

// ✅ Send a message
handler.post(async (req, res) => {
    try {
        const { chatId, sender, text, attachments } = req.body;
        await db.connect()
        const message = new Message({ chatId, sender, text, attachments });
        await message.save();
        await db.disconnect()
        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})

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