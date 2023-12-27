import { NextFunction, Request, Response } from 'express';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/Hotel';

export const createHotel = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        // upload image to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString('base64');
            let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        });

        // wait for all images to be uploaded and return all the image urls in string array
        const imagesUrls = await Promise.all(uploadPromises);

        // if upload is successful, add the url to the new hotel
        newHotel.imageUrls = imagesUrls;
        newHotel.lastUpdate = new Date();
        newHotel.userId = req.userId;

        // save hotel to database
        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
