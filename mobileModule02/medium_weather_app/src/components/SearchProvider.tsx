import { createContext, ReactNode, useEffect, useState } from 'react';
import { getCurrentLocation, LocationType } from '../utils/geolocation';

type SearchContextType = {
  search: LocationType;
  setSearch: React.Dispatch<React.SetStateAction<LocationType>>;
};

export const SearchContext = createContext<SearchContextType>({
    search: null,
    setSearch: () => {}
});

type SearchProviderProps = {
    children: ReactNode;
}

export function SearchProvider({children}: SearchProviderProps) {
    const [search, setSearch] = useState<LocationType>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const location = await getCurrentLocation();
            setSearch(location);
        }

        fetchLocation();
    }, [])
    
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}