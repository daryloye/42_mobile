import * as Location from 'expo-location';
import { CoordinateType } from './coordinateProvider';

export async function getCurrentLocation(): Promise<CoordinateType> {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return null;
    }

    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
    return {
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
    };
}