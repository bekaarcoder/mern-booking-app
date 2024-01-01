import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './routes/users';
import authRoutes from './routes/auth';
import hotelRoutes from './routes/hotels';
import searchRoutes from './routes/search';
import path from 'path';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

app.use(express.static(path.join(__dirname, '../../frontend/dist')));

app.use('/api/hotels/search', searchRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/hotels', hotelRoutes);

app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
});

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
