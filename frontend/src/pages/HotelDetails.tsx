import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import * as APIClient from '../api-client';
import { AiFillStar } from 'react-icons/ai';
import GuestInfoForm from '../components/GuestInfoForm';

const HotelDetails = () => {
    const { hotelId } = useParams();

    const { data: hotelData, isLoading } = useQuery(
        'getHotelDetails',
        () => APIClient.getHotelDetails(hotelId as string),
        {
            enabled: !!hotelId,
        }
    );

    if (isLoading && !hotelData) {
        return <p className="text-center">Fetching hotel details...</p>;
    } else if (!isLoading && hotelData) {
        return (
            <div className="space-y-6">
                <div>
                    <span className="flex">
                        {Array.from({ length: hotelData?.starRating }).map(
                            () => (
                                <AiFillStar className="fill-yellow-400" />
                            )
                        )}
                    </span>
                    <h1 className="text-3xl font-bold">{hotelData.name}</h1>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {hotelData.imageUrls.map((url) => (
                        <div className="h-[300px]">
                            <img
                                src={url}
                                alt={hotelData.name}
                                className="rounded-md w-full h-full object-cover object-center"
                            />
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-2">
                    {hotelData.facilities.map((facility) => (
                        <div className="border border-slate-300 rounded-sm p-3 hover:bg-slate-200">
                            {facility}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-10">
                    <div className="whitespace-pre-line">
                        {hotelData.description}
                    </div>
                    <div className="h-fit">
                        <GuestInfoForm
                            hotelId={hotelData._id}
                            pricePerNight={hotelData.pricePerNight}
                        />
                    </div>
                </div>
            </div>
        );
    }
};

export default HotelDetails;
