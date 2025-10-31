import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAppContext } from '../utils/appContext';
import { getCurrentLocation } from '../utils/geolocation';

export function GeolocationButton() {
    const { setLocation, setErrorMsg } = useAppContext();

    const handlePress = async () => {
        console.log('Pressed Geolocation Button');
        try {
            const location = await getCurrentLocation();
            setLocation(location);
            setErrorMsg(null);
        } catch (error: any) {
            setErrorMsg(error?.message);
        }
    }

    return (
        <Pressable onPress={handlePress}>
            <Ionicons name="navigate" size={20} color='white' />
        </Pressable>
    )
}