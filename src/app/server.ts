import { Server } from 'http'; // শুধু Server টাইপ ইউজ করলে এটুকুই যথেষ্ট
import app from './app';
import mongoose from 'mongoose';

let server: Server;

const port = 5000;

async function main() {
    try {
        await mongoose.connect('mongodb+srv://mongoose:PTfqa1uWhksATip1@cluster0.gwet8mu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('✅ Connected to MongoDB Using Mongoose');

        server = app.listen(port, () => {
            console.log(`Mongoose Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        console.error('❌ Error starting server:', error);
    }
}

main();




