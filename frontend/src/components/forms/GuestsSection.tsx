import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const GuestsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    return (
        <div>
            <h2 className="text-2xl font-bold my-3">Guests</h2>
            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
                <label className="text-gray-700 text-sm font-bold">
                    Adult Count
                    <input
                        type="number"
                        min={1}
                        className={`border ${
                            errors.adultCount && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('adultCount', {
                            required: 'Adult Count is required',
                        })}
                    />
                    {errors.adultCount && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.adultCount.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold">
                    Child Count
                    <input
                        type="number"
                        min={0}
                        className={`border ${
                            errors.childCount && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('childCount', {
                            required: 'Child count is required',
                        })}
                    />
                    {errors.childCount && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.childCount.message}
                        </span>
                    )}
                </label>
            </div>
        </div>
    );
};

export default GuestsSection;
