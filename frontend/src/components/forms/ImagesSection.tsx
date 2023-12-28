import { useFormContext } from 'react-hook-form';
import { HotelFormData } from './ManageHotelForm';
import { MouseEvent } from 'react';

const ImagesSection = () => {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch('imageUrls');

    const handleDelete = (event: MouseEvent, imageUrl: string) => {
        event.preventDefault();
        setValue(
            'imageUrls',
            existingImageUrls.filter((url) => url !== imageUrl)
        );
    };

    return (
        <div>
            <h2 className="text-2xl font-bold my-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map((url) => (
                            <div className="relative group" key={url}>
                                <img
                                    src={url}
                                    className="min-h-full object-cover"
                                />
                                <button
                                    onClick={(e) => handleDelete(e, url)}
                                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                <input
                    type="file"
                    multiple
                    accept="images/*"
                    className="w-full text-gray-700 font-normal"
                    {...register('imageFiles', {
                        validate: (images) => {
                            const totalLength =
                                images.length +
                                (existingImageUrls?.length || 0);
                            if (totalLength === 0)
                                return 'At least one image should be added.';
                            if (totalLength > 6)
                                return 'Total number of images cannot be more than 6.';
                            return true;
                        },
                    })}
                />
            </div>
            {errors.imageFiles && (
                <span className="text-sm font-normal text-red-500">
                    {errors.imageFiles.message}
                </span>
            )}
        </div>
    );
};

export default ImagesSection;
