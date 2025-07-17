

export interface IUser {
    id: string;
    email: string;
    name: string;
    age: number;
    password: string;
    role: 'user' | 'admin';
    createdAt: Date;
}
