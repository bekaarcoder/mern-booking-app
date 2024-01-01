import { Hotel } from './models/Hotel';
import { HotelSearchResponse } from './models/HotelSearchResponse';
import { LoginFormData } from './pages/Login';
import { RegisterFormData } from './pages/Register';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }
};

export const login = async (formData: LoginFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(responseBody.message);
    }

    return responseBody;
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Token invalid');
    }

    return response.json();
};

export const logout = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error occurred');
    }
};

export const addHotel = async (hotelFormData: FormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        method: 'POST',
        credentials: 'include',
        body: hotelFormData,
    });

    if (!response.ok) {
        throw new Error('Error occurred while adding hotel');
    }

    return response.json();
};

export const getHotels = async (): Promise<Hotel[]> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching hotels');
    }

    return response.json();
};

export const getHotel = async (hotelId: string): Promise<Hotel> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Error fetching hotel');
    }

    return response.json();
};

export const updateHotel = async (hotelFormData: FormData) => {
    const response = await fetch(
        `${API_BASE_URL}/api/hotels/${hotelFormData.get('hotelId')}`,
        {
            method: 'PUT',
            credentials: 'include',
            body: hotelFormData,
        }
    );

    if (!response.ok) {
        throw new Error('Failed to update hotel');
    }

    return response.json();
};

export type SearchParams = {
    destination?: string;
    checkIn?: string;
    checkOut?: string;
    adultCount?: string;
    childCount?: string;
    page?: string;
};

export const SearchHotels = async (
    searchParams: SearchParams
): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append('destination', searchParams.destination || '');
    queryParams.append('checkIn', searchParams.checkIn || '');
    queryParams.append('checkOut', searchParams.checkOut || '');
    queryParams.append('adultCount', searchParams.adultCount || '');
    queryParams.append('childCount', searchParams.childCount || '');
    queryParams.append('page', searchParams.page || '');

    const response = await fetch(
        `${API_BASE_URL}/api/hotels/search?${queryParams}`
    );

    if (!response.ok) {
        throw new Error('Error searching hotels');
    }

    return response.json();
};
