import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';

const DetailsSection = () => {
    const {
        register,
        formState: { errors },
    } = useFormContext<HotelFormData>();
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input
                    type="text"
                    className={`border ${
                        errors.name && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('name', {
                        required: 'Hotel name is required',
                    })}
                />
                {errors.name && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.name.message}
                    </span>
                )}
            </label>

            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input
                        type="text"
                        className={`border ${
                            errors.city && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('city', {
                            required: 'City is required',
                        })}
                    />
                    {errors.city && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.city.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input
                        type="text"
                        className={`border ${
                            errors.country && 'border-red-500'
                        } rounded w-full py-1 px-2 font-normal my-1`}
                        {...register('country', {
                            required: 'country is required',
                        })}
                    />
                    {errors.country && (
                        <span className="text-red-500 text-sm font-normal">
                            {errors.country.message}
                        </span>
                    )}
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea
                    rows={10}
                    className={`border ${
                        errors.description && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('description', {
                        required: 'Description is required',
                    })}
                ></textarea>
                {errors.description && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.description.message}
                    </span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Price Per Night
                <input
                    type="number"
                    min={1}
                    className={`border ${
                        errors.pricePerNight && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('pricePerNight', {
                        required: 'Price per night is required',
                    })}
                />
                {errors.pricePerNight && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.pricePerNight.message}
                    </span>
                )}
            </label>

            <label className="text-gray-700 text-sm font-bold max-w-[50%]">
                Star Rating
                <select
                    className={`border ${
                        errors.starRating && 'border-red-500'
                    } rounded w-full py-1 px-2 font-normal my-1`}
                    {...register('starRating', {
                        required: 'Star rating is required',
                    })}
                >
                    <option value="" className="text-sm font-bold">
                        Select a Rating
                    </option>
                    {[1, 2, 3, 4, 5].map((val) => (
                        <option value={val}>{val}</option>
                    ))}
                </select>
                {errors.starRating && (
                    <span className="text-red-500 text-sm font-normal">
                        {errors.starRating.message}
                    </span>
                )}
            </label>
        </div>
    );
};

export default DetailsSection;
