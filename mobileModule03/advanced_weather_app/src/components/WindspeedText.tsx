import { StyleSheet, Text } from 'react-native';

export function WindspeedText({data}: {data: number | undefined}) {
    return (
    <Text style={styles.text}>
        💨 {data?.toFixed(1)} km/h
    </Text>
    )
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
  }
});