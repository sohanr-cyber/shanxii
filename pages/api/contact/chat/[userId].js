

import Chat from '@/database/model/Contact/Chat';
import nc from 'next-connect'
const handler = nc()



// ✅ Get all chats of a user
handler.get(async (req, res) => {
    try {
        const chats = await Chat.find({ participants: req.query.userId }).populate('participants', 'name email');
        res.json(chats);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})




export default handler