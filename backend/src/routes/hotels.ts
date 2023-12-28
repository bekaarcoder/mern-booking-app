import express from 'express';
import { upload } from '../middlewares/fileUpload';
import { createHotel, getHotels } from '../controllers/hotels';
import { verifyToken } from '../middlewares/auth';
import { HotelBodyValidator } from '../middlewares/validator';

const router = express.Router();

router.post(
    '/',
    verifyToken,
    HotelBodyValidator,
    upload.array('imageFiles', 6),
    createHotel
);

router.get('/', verifyToken, getHotels);

export default router;
