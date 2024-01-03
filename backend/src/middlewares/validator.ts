import { NextFunction, Request, Response } from 'express';
import { body, check, param, validationResult } from 'express-validator';

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

export const HotelBodyValidator = [
    body('name').notEmpty().withMessage('Hotel name is required'),
    body('city').notEmpty().withMessage('City is required'),
    body('country').notEmpty().withMessage('Country is required'),
    body('Description').notEmpty().withMessage('Description is required'),
    body('type').notEmpty().withMessage('Hotel type is required'),
    body('pricePerNight')
        .notEmpty()
        .isNumeric()
        .withMessage('Price per night is required and must be a number'),
    body('facilities')
        .notEmpty()
        .isArray()
        .withMessage('Facilities are required'),
];

export const HotelParamsValidator = [
    param('id').notEmpty().withMessage('Hotel ID is required'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg });
    }
    next();
};
