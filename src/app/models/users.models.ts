import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const userSchema = new Schema<IUser>({
    id: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now }
}, {
    timestamps: true,
    versionKey: false
})


export const UserModel = model<IUser>('User', userSchema);