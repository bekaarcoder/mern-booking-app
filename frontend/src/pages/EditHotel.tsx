import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as APICLient from '../api-client';
import ManageHotelForm from '../components/forms/ManageHotelForm';
import { useAppContext } from '../hooks/useAppContext';

const EditHotel = () => {
    const { hotelId } = useParams();

    const { showToast } = useAppContext();

    const { data: hotelData } = useQuery(
        'fetchHotel',
        () => APICLient.getHotel(hotelId || ''),
        {
            enabled: !!hotelId,
        }
    );

    const { mutate, isLoading } = useMutation(APICLient.updateHotel, {
        onSuccess: () => {
            showToast({
                message: 'Hotel updated successfully',
                type: 'SUCCESS',
            });
        },
        onError: (error: Error) => {
            showToast({ message: error.message, type: 'ERROR' });
        },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
    };

    return (
        <ManageHotelForm
            onSave={handleSave}
            isLoading={isLoading}
            hotel={hotelData}
        />
    );
};

export default EditHotel;
