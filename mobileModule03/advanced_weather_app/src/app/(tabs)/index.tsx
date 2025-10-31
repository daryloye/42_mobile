import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMsg } from '../../components/ErrorMsg';
import { CurrentWeatherType, fetchCurrentWeather } from '../../utils/api';
import { useAppContext } from '../../utils/appContext';

export default function CurrentScreen() {
  const { location, setLocationList, errorMsg, setErrorMsg } = useAppContext();
  const [data, setData] = useState<CurrentWeatherType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (location) {
          const weatherData = await fetchCurrentWeather(location);
          setData(weatherData);
          setErrorMsg(null);
        }
      } catch (error: any) {
        setErrorMsg(error?.message);
      }
    })();
  }, [location])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setLocationList(null);
      }}
    >
      <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
        {errorMsg ? (
          <ErrorMsg />
        ) : (
          <Text style={styles.text}>
            {location?.city}{'\n'}
            {location?.region}{'\n'}
            {location?.country}{'\n'}
            {data?.temperature.toFixed(1)}°C{'\n'}
            {data?.weather}{'\n'}
            {data?.wind_speed.toFixed(1)}km/h
          </Text>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    textAlign: 'center',
  }
});
