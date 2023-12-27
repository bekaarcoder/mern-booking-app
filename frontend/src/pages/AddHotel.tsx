import { useMutation } from 'react-query';
import * as APIClient from '../api-client';
import ManageHotelForm from '../components/forms/ManageHotelForm';
import { useAppContext } from '../hooks/useAppContext';
import { useRef } from 'react';

const AddHotel = () => {
    const manageHotelFormRef = useRef();
    const { showToast } = useAppContext();
    const { mutate, isLoading } = useMutation(APIClient.addHotel, {
        onSuccess: () => {
            showToast({ message: 'Hotel added successfully', type: 'SUCCESS' });
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            manageHotelFormRef.current.reset();
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
            ref={manageHotelFormRef}
            onSave={handleSave}
            isLoading={isLoading}
        />
    );
};

export default AddHotel;
