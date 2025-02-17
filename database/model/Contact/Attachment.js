import mongoose from 'mongoose'

const AttachmentSchema = new mongoose.Schema({
    messageId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
    url: { type: String, required: true },
    fileType: { type: String }, // Image, PDF, etc.
    fileSize: { type: Number }, // Size in bytes
    createdAt: { type: Date, default: Date.now }
});


const Attachment =
    mongoose.models.Attachment || mongoose.model('Attachment', AttachmentSchema)
export default Attachment
