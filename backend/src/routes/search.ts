import express from 'express';
import { searchHotel } from '../controllers/search';

const router = express.Router();

router.get('/', searchHotel);

export default router;
