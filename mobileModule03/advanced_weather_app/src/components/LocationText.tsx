import { StyleSheet, Text, View } from 'react-native';
import { LocationType } from '../utils/appContext';

export function LocationText({ location }: { location: LocationType }) {
    return (
        <View>
            <Text style={styles.textUpper}>{location.city}</Text>
            {location.region ? <Text style={styles.textLower}>{location.region}, {location?.country}</Text>
                : <Text style={styles.textLower}>{location.country}</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textUpper: {
        color: "#90D5FF",
        fontSize: 24,
        textAlign: 'center',
    },
    textLower: {
        color: "white",
        fontSize: 24,
        textAlign: 'center',
    }
});
