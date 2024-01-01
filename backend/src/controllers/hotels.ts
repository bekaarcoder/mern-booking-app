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
        const imagesUrls = await uploadImages(imageFiles);

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

export const getHotels = async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId });
        res.status(200).json(hotels);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const getHotel = async (req: Request, res: Response) => {
    try {
        const id = req.params.id.toString();
        const hotel = await Hotel.findOne({ _id: id, userId: req.userId });
        res.status(200).json(hotel);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

export const updateHotel = async (req: Request, res: Response) => {
    try {
        const updateHotel: HotelType = req.body;
        updateHotel.lastUpdate = new Date();

        const hotel = await Hotel.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: req.userId,
            },
            updateHotel,
            { new: true }
        );

        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const files = req.files as Express.Multer.File[];
        const updatedImageUrls = await uploadImages(files);

        hotel.imageUrls = [
            ...updatedImageUrls,
            ...(updateHotel.imageUrls || []),
        ];
        await hotel.save();

        res.status(200).json({ message: 'Ok' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    // wait for all images to be uploaded and return all the image urls in string array
    const imagesUrls = await Promise.all(uploadPromises);
    return imagesUrls;
}
