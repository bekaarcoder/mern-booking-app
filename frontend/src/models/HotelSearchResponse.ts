import { Hotel } from './Hotel';

export interface HotelSearchResponse {
    data: Hotel[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}
