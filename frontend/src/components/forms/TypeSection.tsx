import { useFormContext } from 'react-hook-form';
import { hotelTypes } from '../../config/hotel-option-config';
import { HotelFormData } from './ManageHotelForm';

const TypeSection = () => {
    const {
        register,
        watch,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    const typeWatch = watch('type');
    return (
        <div>
            <h2 className="text-2xl font-bold my-3">Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((type) => (
                    <label
                        key={type}
                        className={`cursor-pointer ${
                            typeWatch === type ? 'bg-blue-300' : 'bg-gray-300'
                        } text-sm rounded-full px-4 py-2 font-semibold hover:bg-gray-400`}
                    >
                        <input
                            type="radio"
                            value={type}
                            {...register('type', {
                                required: 'Hotel type is required',
                            })}
                            className="hidden"
                        />
                        <span>{type}</span>
                    </label>
                ))}
            </div>
            {errors.type && (
                <span className="text-sm font-normal text-red-500">
                    {errors.type.message}
                </span>
            )}
        </div>
    );
};

export default TypeSection;
