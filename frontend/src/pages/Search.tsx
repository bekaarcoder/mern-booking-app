import { useQuery } from 'react-query';
import { useSearchContext } from '../hooks/useSearchContext';
import * as APIClient from '../api-client';
import { ChangeEvent, useState } from 'react';
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRatingFilter from '../components/StarRatingFilter';
import TypesFilter from '../components/TypesFilter';
import FacilitiesFilter from '../components/FacilitiesFilter';
import PriceFilter from '../components/PriceFilter';
import SortDropdown from '../components/SortDropdown';

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [selectedSortOption, setSelectedSortOption] = useState<
        string | undefined
    >();

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOption: selectedSortOption,
    };

    const { data: hotelData } = useQuery(['searchHotels', searchParams], () =>
        APIClient.SearchHotels(searchParams)
    );

    const handleStarsChange = (event: ChangeEvent<HTMLInputElement>) => {
        const starRating = event.target.value;
        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : prevStars.filter((star) => star !== starRating)
        );
        setPage(1);
    };

    const handleTypesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hotelType = event.target.value;
        setSelectedTypes((prevTypes) =>
            event.target.checked
                ? [...prevTypes, hotelType]
                : prevTypes.filter((type) => type !== hotelType)
        );
        setPage(1);
    };

    const handleFacilitiesChange = (event: ChangeEvent<HTMLInputElement>) => {
        const hotelFacility = event.target.value;
        setSelectedFacilities((prevFacilities) =>
            event.target.checked
                ? [...prevFacilities, hotelFacility]
                : prevFacilities.filter((type) => type !== hotelFacility)
        );
        setPage(1);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="spacy-y-5">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
                        Filter by:
                    </h3>
                    <StarRatingFilter
                        selectedStars={selectedStars}
                        onChange={handleStarsChange}
                    />
                    <TypesFilter
                        selectedTypes={selectedTypes}
                        onChange={handleTypesChange}
                    />
                    <FacilitiesFilter
                        selectedFacilities={selectedFacilities}
                        onChange={handleFacilitiesChange}
                    />
                    <PriceFilter
                        selectedPrice={selectedPrice}
                        onChange={(value?: number) => {
                            setSelectedPrice(value);
                            setPage(1);
                        }}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.pagination.total} Hotels found
                        {search.destination ? ` in ${search.destination}` : ''}
                    </span>
                    <SortDropdown
                        selectedSortOption={selectedSortOption}
                        onChange={(value?: string) => {
                            setSelectedSortOption(value);
                            setPage(1);
                        }}
                    />
                </div>
                {hotelData?.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} key={hotel._id} />
                ))}
                <div>
                    <Pagination
                        page={hotelData?.pagination.page || 1}
                        pages={hotelData?.pagination.pages || 1}
                        onPageChange={(page) => setPage(page)}
                    />
                </div>
            </div>
        </div>
    );
};

export default Search;
