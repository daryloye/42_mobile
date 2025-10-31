import { StyleSheet, Text } from 'react-native';
import { useAppContext } from '../utils/appContext';

export function ErrorMsg() {
    const { errorMsg } = useAppContext();

    return (
        <Text style={styles.error}>
            {errorMsg}
        </Text>
    );
}

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
    }
})
