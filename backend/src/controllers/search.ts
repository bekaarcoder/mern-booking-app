import { Request, Response } from 'express';
import Hotel, { HotelType } from '../models/Hotel';

export interface HotelSearchResponse {
    data: HotelType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export const searchHotel = async (req: Request, res: Response) => {
    try {
        const pageSize = 5;
        const pageNumber = parseInt(
            req.query.page ? req.query.page.toString() : '1'
        );
        const skip = (pageNumber - 1) * pageSize;

        const hotels = await Hotel.find().skip(skip).limit(pageSize);

        const total = await Hotel.countDocuments();

        const response: HotelSearchResponse = {
            data: hotels,
            pagination: {
                total: total,
                page: pageNumber,
                pages: Math.ceil(total / pageSize),
            },
        };

        res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};
