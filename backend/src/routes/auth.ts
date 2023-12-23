import express from 'express';
import { LoginBodyValidator, validate } from '../middlewares/validator';
import { login } from '../controllers/auth';

const router = express.Router();

router.post('/login', LoginBodyValidator, validate, login);

export default router;
