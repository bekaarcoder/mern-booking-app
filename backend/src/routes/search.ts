import express from 'express';
import { getHotelDetails, searchHotel } from '../controllers/search';
import { HotelParamsValidator } from '../middlewares/validator';

const router = express.Router();

router.get('/', searchHotel);

router.get('/:id', HotelParamsValidator, getHotelDetails);

export default router;
