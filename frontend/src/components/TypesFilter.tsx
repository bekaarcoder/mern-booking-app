import { ChangeEvent } from 'react';
import { hotelTypes } from '../config/hotel-option-config';

interface Props {
    selectedTypes: string[];
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TypesFilter = ({ selectedTypes, onChange }: Props) => {
    return (
        <div className="border-b border-slate-300 pb-5">
            <h4 className="text-md font-semibold mb-2">Hotel Type</h4>
            {hotelTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                    <input
                        type="checkbox"
                        className="rounded"
                        value={type}
                        checked={selectedTypes.includes(type)}
                        onChange={onChange}
                    />
                    <span>{type}</span>
                </label>
            ))}
        </div>
    );
};

export default TypesFilter;
