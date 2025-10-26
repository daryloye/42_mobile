import * as Location from 'expo-location';

export type LocationType = {
    longitude: number,
    latitude: number,
} | null

export async function getCurrentLocation(): Promise<LocationType> {
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