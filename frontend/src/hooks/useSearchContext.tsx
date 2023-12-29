import { useContext } from 'react';
import { SearchContext } from '../contexts/SearchContext';

export const useSearchContext = () => {
    const context = useContext(SearchContext);

    if (!context) {
        throw Error(
            'useSearchContext must be used inside SearchContextProvider'
        );
    }

    return context;
};
