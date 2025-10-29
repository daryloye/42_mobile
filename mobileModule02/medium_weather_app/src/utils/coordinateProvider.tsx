import { createContext, ReactNode, useEffect, useState } from 'react';
import { getCurrentLocation } from './geolocation';

export type CoordinateType = {
    longitude: number,
    latitude: number,
} | null

type CoordinateContextType = {
  coordinate: CoordinateType;
  setCoordinate: React.Dispatch<React.SetStateAction<CoordinateType>>;
};

export const CoordinateContext = createContext<CoordinateContextType>({
    coordinate: null,
    setCoordinate: () => {}
});

type CoordinateProviderProps = {
    children: ReactNode;
}

export function CoordinateProvider({children}: CoordinateProviderProps) {
    const [coordinate, setCoordinate] = useState<CoordinateType>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            const location = await getCurrentLocation();
            setCoordinate(location);
        }

        fetchLocation();
    }, [])
    
    return (
        <CoordinateContext.Provider value={{ coordinate: coordinate, setCoordinate: setCoordinate }}>
            {children}
        </CoordinateContext.Provider>
    )
}