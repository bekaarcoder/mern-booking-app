interface Props {
    selectedSortOption?: string;
    onChange: (value?: string) => void;
}
const SortDropdown = ({ selectedSortOption, onChange }: Props) => {
    return (
        <div>
            <select
                value={selectedSortOption}
                onChange={(event) =>
                    onChange(
                        event.target.value ? event.target.value : undefined
                    )
                }
                className="p-2 border rounded-md"
            >
                <option value="">Sort By</option>
                <option value="starRating">Sort By Star Rating</option>
                <option value="pricePerNightAsc">
                    Sort By Price (Low to high)
                </option>
                <option value="pricePerNightDesc">
                    Sort By Price (High to low)
                </option>
            </select>
        </div>
    );
};

export default SortDropdown;
