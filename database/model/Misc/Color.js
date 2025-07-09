import mongoose from 'mongoose'

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // e.g. "Red"
        trim: true
    },
    rgb: {
        type: String,
        required: true, // e.g. "rgb(255, 0, 0)"
    },
    hex: {
        type: String,
        required: false, // e.g. "#FF0000"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    sortOrder: {
        type: Number,
        default: 0 // for custom sorting in UI
    }
});

const Color = mongoose.models.Color || mongoose.model('Color', colorSchema)
export default Color
