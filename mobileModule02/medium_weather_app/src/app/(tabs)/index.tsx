import { useEffect, useState } from 'react';
import { Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
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
      <View style={styles.container}>
        {errorMsg ? (
          <ErrorMsg />
        ) : (
          <Text style={styles.text}>
            {location?.city}{'\n'}
            {location?.region}{'\n'}
            {location?.country}{'\n'}
            {data && data.temperature.toFixed(1)}°C{'\n'}
            {data && data.weather}{'\n'}
            {data && data.wind_speed.toFixed(1)}km/h
          </Text>
        )}
      </View>
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
