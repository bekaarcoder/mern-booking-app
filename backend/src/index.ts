import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
    })
);

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'Hello from Express server!' });
});

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

mongoose
    .connect(process.env.MONGODB_CONNECTION_STRING as string)
    .then(() => {
        console.info(
            `Connected to ${process.env.MONGODB_CONNECTION} MongoDB database.`
        );
        app.listen(5000, () => {
            console.info(`Server is running on localhost:5000`);
        });
    })
    .catch((error) => {
        console.error(error);
    });
