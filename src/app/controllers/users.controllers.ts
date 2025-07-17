
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import { UserModel } from '../models/users.models';

export const userRouter = express.Router();

// Get all users
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserModel.find();
        res.status(200).send({
            message: 'Users retrieved successfully',
            users
        });
    } catch (error) {
        next(error);
    }
});

// Fetch a user by ID
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findOne({ id: id });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User found successfully',
            user
        });
    } catch (error) {
        next(error);
    }
});

// Create a new user
userRouter.post('/create-user', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body;
        const user = await UserModel.create(body);
        res.status(201).send({
            message: 'User created successfully',
            user
        });
    } catch (error) {
        next(error);
    }
});

//  update a user by ID
userRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const user = await UserModel.updateOne({ id: id }, updateData, { new: true });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User updated successfully',
            updateData
        });
    } catch (error) {
        next(error);
    }
});


// Delete a user by ID
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UserModel.deleteOne({ id: id });
        if (user.deletedCount === 0) {      
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({
            message: 'User deleted successfully',
            user
        }); 
    } catch (error) {
        next(error);
    }
});