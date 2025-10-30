import * as Location from 'expo-location';
import { CoordinateType } from './appContext';

export async function getCurrentLocation(): Promise<CoordinateType | null> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    return {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
    };
}