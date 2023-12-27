import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { hotelFacilities } from '../../config/hotel-option-config';

const FacilitiesSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div>
            <h2 className="text-2xl font-bold my-3">Facilities</h2>
            <div className="grid grid-cols-5 gap-3">
                {hotelFacilities.map((val) => (
                    <label className="text-sm flex gap-1 text-gray-700">
                        <input
                            type="checkbox"
                            value={val}
                            {...register('facilities', {
                                validate: (facilities) => {
                                    if (facilities.length > 0) {
                                        return true;
                                    }
                                    return 'At least one facility should be selected.';
                                },
                            })}
                        />
                        {val}
                    </label>
                ))}
            </div>
            {errors.facilities && (
                <span className="text-sm font-normal text-red-500">
                    {errors.facilities.message}
                </span>
            )}
        </div>
    );
};

export default FacilitiesSection;
