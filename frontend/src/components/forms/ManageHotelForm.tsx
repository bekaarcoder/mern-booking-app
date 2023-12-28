import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import FacilitiesSection from './FacilitiesSection';
import GuestsSection from './GuestsSection';
import ImagesSection from './ImagesSection';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { Hotel } from '../../models/Hotel';

export type HotelFormData = {
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    pricePerNight: number;
    starRating: number;
    facilities: string[];
    imageUrls: string[];
    imageFiles: FileList;
    adultCount: number;
    childCount: number;
};

interface Props {
    hotel?: Hotel;
    onSave: (hotelFormData: FormData) => void;
    isLoading: boolean;
}

const ManageHotelForm = forwardRef(
    ({ onSave, isLoading, hotel }: Props, ref) => {
        const formMethods = useForm<HotelFormData>();
        const { handleSubmit, reset } = formMethods;

        useEffect(() => {
            reset(hotel);
        }, [reset, hotel]);

        useImperativeHandle(ref, () => ({
            reset: reset,
        }));

        const onSubmit = handleSubmit((data: HotelFormData) => {
            const formData = new FormData();
            if (hotel) {
                formData.append('hotelId', hotel._id);
            }
            formData.append('name', data.name);
            formData.append('city', data.city);
            formData.append('country', data.country);
            formData.append('description', data.description);
            formData.append('type', data.type);
            formData.append('pricePerNight', data.pricePerNight.toString());
            formData.append('starRating', data.starRating.toString());
            formData.append('adultCount', data.adultCount.toString());
            formData.append('childCount', data.childCount.toString());
            data.facilities.forEach((facility, index) => {
                formData.append(`facilities[${index}]`, facility);
            });

            if (data.imageUrls) {
                data.imageUrls.forEach((url, index) => {
                    formData.append(`imageUrls[${index}]`, url);
                });
            }
            Array.from(data.imageFiles).forEach((imageFile) => {
                formData.append(`imageFiles`, imageFile);
            });

            onSave(formData);
        });

        return (
            <FormProvider {...formMethods}>
                <form className="flex flex-col gap-10" onSubmit={onSubmit}>
                    <DetailsSection />
                    <TypeSection />
                    <FacilitiesSection />
                    <GuestsSection />
                    <ImagesSection />
                    <span className="flex justify-end items-center">
                        <button
                            type="submit"
                            className="bg-blue-600 text-white py-2 px-4 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save'}
                        </button>
                    </span>
                </form>
            </FormProvider>
        );
    }
);

export default ManageHotelForm;
