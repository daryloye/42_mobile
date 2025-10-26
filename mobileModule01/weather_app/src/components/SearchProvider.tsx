import { createContext, ReactNode, useState } from 'react';

type SearchContextType = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchContext = createContext<SearchContextType | null>(null);

type SearchProviderProps = {
    children: ReactNode;
}

export function SearchProvider({children}: SearchProviderProps) {
    const [search, setSearch] = useState('');
    
    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    )
}