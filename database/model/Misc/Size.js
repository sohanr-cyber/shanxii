import mongoose from 'mongoose'

const sizeSchema = new mongoose.Schema({
    name: { type: String, required: true },           // e.g. "M", "32", "43 inch"
    category: {                                        // Helps group sizes by product type
        type: String,
        enum: [
            'clothing',
            'shoes_men',
            'shoes_women',
            'shoes_kids',
            'baby',
            'bed',
            'curtain',
            'electronics',
            'accessory',
            'ring',
            'bra',
            "numeric_clothing"
        ],
        required: true
    },
    displayName: { type: String },                    // Optional: for frontend (e.g. "Medium (M)")
    sortOrder: { type: Number, default: 0 },          // For sorting in dropdowns
    isActive: { type: Boolean, default: true }
});

const Size = mongoose.models.Size || mongoose.model('Size', sizeSchema)
export default Size
