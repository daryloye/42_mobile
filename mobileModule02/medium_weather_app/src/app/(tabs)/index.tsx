import { useContext } from 'react';
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { CoordinateContext } from '../../utils/coordinateProvider';


export default function CurrentScreen() {
  const { coordinate: search } = useContext(CoordinateContext);

  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      {search === null ? (
        <Text style={styles.error}>
          Geolocation is not available, please enable it in your App settings
        </Text>
      ) : (
          <Text style={styles.text}>Currently{'\n'}{search.latitude} {search.longitude}</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  }
});
