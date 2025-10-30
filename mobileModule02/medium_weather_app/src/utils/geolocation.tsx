import * as Location from 'expo-location';
import { LocationType } from './appContext';

export async function getCurrentLocation(): Promise<LocationType | null> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.warn('Permission to access location was denied');
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    const [reverseGeocode] = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    });

    return {
        city: reverseGeocode.city ?? '',
        region: reverseGeocode.district ?? '',
        country: reverseGeocode.country ?? '',
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
    };
}