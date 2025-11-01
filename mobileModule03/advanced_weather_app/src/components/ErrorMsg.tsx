import { StyleSheet, Text, View } from 'react-native';
import { useAppContext } from '../utils/appContext';

export function ErrorMsg() {
    const { errorMsg } = useAppContext();

    return (
        <View style={styles.container}>
            <Text style={styles.error}>{errorMsg}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
    }
})
