

import Chat from '@/database/model/Contact/Chat';
import nc from 'next-connect'
const handler = nc()

// ✅ Create a new chat
handler.post(async (req, res) => {
    try {
        const { participants, orderId } = req.body;

        let chat = await Chat.findOne({ participants: { $all: participants } }).populate('participants', 'name email');

        if (!chat) {
            chat = new Chat({ participants, orderId });
            await chat.save();
            chat = await Chat.findOne({ participants: { $all: participants } }).populate('participants', 'name email');

        }

        res.status(201).json(chat);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// ✅ Fetch All The chat
handler.get(async (req, res) => {
    try {
        const { participants, orderId } = req.body;

        let chats = await Chat.find({});


        res.status(201).json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




export default handler