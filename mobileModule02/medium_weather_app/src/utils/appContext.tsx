import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getCurrentLocation } from './geolocation';

export type CoordinateType = {
    longitude: number;
    latitude: number;
}

export type LocationType = {
    id: number,
    name: string,
    admin1: string,
    country: string,
    latitude: number,
    longitude: number,
}


// AppContext

type AppContextType = {
    coordinate: CoordinateType | null;
    setCoordinate: React.Dispatch<React.SetStateAction<CoordinateType | null>>;
    locationList: LocationType[] | null;
    setLocationList: React.Dispatch<React.SetStateAction<LocationType[] | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [coordinate, setCoordinate] = useState<CoordinateType | null>(null);
    const [locationList, setLocationList] = useState<LocationType[] | null>(null);

    // fetch coordinate on app start
    useEffect(() => {
        const fetchLocation = async () => {
            const location = await getCurrentLocation();
            setCoordinate(location);
        }

        fetchLocation();
    }, [])

    return (
        <AppContext.Provider
            value={{
                coordinate,
                setCoordinate,
                locationList,
                setLocationList,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export function useAppContext() {
    const ctx = useContext(AppContext);
    if (!ctx) {
        throw new Error('useAppContext must be used inside an AppProvider');
    }
    return ctx;
}




