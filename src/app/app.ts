import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';


const app: Application = express();

// ✅ Must-have middleware
app.use(express.json());

const noteSchema = new mongoose.Schema({
    name: {type : String, required: true, trim: true},
    title: {type : String, required: true, trim: true},
    description: {type : String, default: '', trim: true},
    category: {
        type: String,
        enum: ['personal', 'work', 'business', 'other'],
        default: 'personal'
    },
    pined: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
});

const Note = mongoose.model('Note', noteSchema);

app.post('/notes/create-note', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const note = await Note.create(body);

        res.status(201).send(note);

    } catch (error) {
        next(error);
    }
});

app.get('/notes', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        next(error);
    }
});

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