import mongoose from "mongoose";


// Mongoose schema and model for notes
const noteSchema = new mongoose.Schema({
    userId: { type: Number, ref: 'User', required: true },
    name: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    category: {
        type: String,
        enum: ['personal', 'work', 'business', 'other'],
        default: 'personal'
    },
    pined: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
}, {
    versionKey: false,  
    timestamps: true  
});

// Create the Mongoose model
export const Note = mongoose.model('Note', noteSchema);
