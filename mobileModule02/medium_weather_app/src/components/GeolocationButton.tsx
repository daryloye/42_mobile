import { Ionicons } from '@expo/vector-icons';
import { useContext } from 'react';
import { Pressable } from 'react-native';
import { getCurrentLocation } from '../utils/geolocation';
import { SearchContext } from './SearchProvider';

export function GeolocationButton() {
    const { setSearch } = useContext(SearchContext);
    const handlePress = async () => {
        const location = await getCurrentLocation();
        setSearch(location);
    }

    return (
        <Pressable onPress={handlePress}>
            <Ionicons name="navigate" size={20} color='white' />
        </Pressable>
    )
}