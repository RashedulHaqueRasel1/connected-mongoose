import express, { Application, NextFunction, Request, Response } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send({ message: 'Hello, Well Come to the first Mongoose App!' });
});

export default app;