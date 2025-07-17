import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { Note } from '../models/notes.models';


export const notesRouter = express.Router();


// Get all notes
notesRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        next(error);
    }
});

// Create a new note
notesRouter.post('/create-note', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;

        const note = await Note.create(body);

        res.status(201).send(note);

    } catch (error) {
        next(error);
    }
});

// Fetch a note by ID
notesRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
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
notesRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
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
notesRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
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
