import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Pressable } from 'react-native';
import { CoordinateContext } from '../utils/coordinateProvider';
import { getCurrentLocation } from '../utils/geolocation';

export function GeolocationButton() {
    const { coordinate, setCoordinate } = useContext(CoordinateContext);
    
    const handlePress = async () => {
        const location = await getCurrentLocation();
        setCoordinate(location);
    }

    return (
        <Pressable onPress={handlePress}>
            <Ionicons name="navigate" size={20} color='white' />
        </Pressable>
    )
}