import { NextFunction, Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const registerBodyValidator = [
    check('firstName', 'First Name is required').notEmpty(),
    check('lastName', 'Last Name is required').notEmpty(),
    check('email', 'Email is required').isEmail(),
    check(
        'password',
        'Password with 8 or more characters is required'
    ).isLength({ min: 8 }),
];

export const LoginBodyValidator = [
    check('email', 'Email is required').notEmpty().isEmail(),
    check('password', 'Password is required').notEmpty(),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
};
