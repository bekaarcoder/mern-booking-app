import express from 'express';
import { register } from '../controllers/users';
import { registerBodyValidator, validate } from '../middlewares/validator';

const router = express.Router();

router.post('/register', registerBodyValidator, validate, register);

export default router;
