import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';


const app: Application = express();

// ✅ Must-have middleware
app.use(express.json());

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
const Note = mongoose.model('Note', noteSchema);


// Create a new note
app.post('/notes/create-note', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const note = await Note.create(body);

        res.status(201).send(note);

    } catch (error) {
        next(error);
    }
});

// Get all notes
app.get('/notes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        next(error);
    }
});

// Fetch a note by ID
app.get('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).send({ message: 'Note not found' });
        }
        res.status(200).send({
            message: 'Note found successfully',
            note
        });
    } catch (error) {
        next(error);
    }
});


// This endpoint updates a note by its userId
app.patch('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params; // Note ID from URL
        const { userId, ...updateData } = req.body;
        const note = await Note.findOneAndUpdate(
            { userId: id },
            updateData,
            { new: true }
        );
        if (!note) {
            return res.status(404).send({ message: 'Note not found or user mismatch' });
        }

        res.status(200).send({
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        next(error);
    }
});

// This endpoint deletes a note by its  userId
app.delete('/notes/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.params; // Note ID from URL
        const note = await Note.findOneAndDelete(
            { userId: userId }
        );
        if (!note) {
            return res.status(404).send({ message: 'Note not found or user mismatch' });
        }

        res.status(200).send({
            message: 'Note deleted successfully',
            note
        });
    } catch (error) {
        next(error);
    }
});






// well come route
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: 'Hello, Well Come to the first Mongoose App!' });
});

// 404 Not Found middleware
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).send({
        message: '404 Not Found',
        error: 'The requested resource was not found'
    });
});

// Error handling middleware
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('❌ Error:', error.message);
    res.status(500).send({ message: 'Internal Server Error', error: error.message });
});

export default app;