import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';
import User from '../models/User';
import { registerBodyValidator, validate } from '../middlewares/validator';
import { register } from '../controllers/users';

const router = express.Router();

router.post('/register', registerBodyValidator, validate, register);

export default router;
