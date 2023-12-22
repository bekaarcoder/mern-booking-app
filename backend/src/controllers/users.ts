import jwt from 'jsonwebtoken';
import User from '../models/User';
import { RequestHandler } from 'express';

interface RegisterBody {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

export const register: RequestHandler<
    unknown,
    unknown,
    RegisterBody,
    unknown
> = async (req, res, next) => {
    try {
        let user = await User.findOne({
            email: req.body.email,
        });

        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        user = new User(req.body);
        await user.save();

        const token = jwt.sign(
            {
                userId: user.id,
            },
            process.env.JWT_SECRET_KEY as string,
            {
                expiresIn: '1d',
            }
        );

        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.sendStatus(200);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};
