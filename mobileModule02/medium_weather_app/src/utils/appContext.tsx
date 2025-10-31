import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getCurrentLocation } from './geolocation';

export type LocationType = {
    id: number,
    city: string,
    region: string,
    country: string,
    latitude: number,
    longitude: number,
}

// AppContext
type AppContextType = {
    location: LocationType | null;
    setLocation: React.Dispatch<React.SetStateAction<LocationType | null>>;
    locationList: LocationType[] | null;
    setLocationList: React.Dispatch<React.SetStateAction<LocationType[] | null>>;
    errorMsg: string | null;
    setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [location, setLocation] = useState<LocationType | null>(null);
    const [locationList, setLocationList] = useState<LocationType[] | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // fetch coordinate on app start
    useEffect(() => {
        console.log('Fetching coordinates on app start');
        (async () => {
            try {
                const location = await getCurrentLocation();
                setLocation(location);
                setErrorMsg(null);
            } catch (error: any) {
                setErrorMsg(error?.message);
            }
        })();
    }, [])

    return (
        <AppContext.Provider
            value={{
                location: location,
                setLocation: setLocation,
                locationList,
                setLocationList,
                errorMsg,
                setErrorMsg,
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




