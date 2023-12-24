import express, { Request, Response } from 'express';
import { LoginBodyValidator, validate } from '../middlewares/validator';
import { login, logout, validateUserToken } from '../controllers/auth';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.post('/login', LoginBodyValidator, validate, login);

router.get('/validate-token', verifyToken, validateUserToken);

router.post('/logout', logout);

export default router;
