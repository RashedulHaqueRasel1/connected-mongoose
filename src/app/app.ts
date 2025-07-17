import express, { Application, NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { notesRouter } from './controllers/notes.controllers';


const app: Application = express();

// ✅ Must-have middleware
app.use(express.json());


// ✅ Register the notes router
app.use("/notes", notesRouter);





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