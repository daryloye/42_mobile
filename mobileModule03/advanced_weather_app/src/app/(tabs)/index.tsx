import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ErrorMsg } from '../../components/ErrorMsg';
import { LocationText } from '../../components/LocationText';
import { WindspeedText } from '../../components/WindspeedText';
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
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {errorMsg ? (
          <ErrorMsg />
        ) : (
          <View style={styles.container}>
            
            {/* Location */}
            {location && <LocationText location={location} />}

            {/* Temperature */}
            {data && <Text style={styles.temperature}>{data.temperature.toFixed(1)}°C</Text>}

            {/* Weather + Wind Speed */}
            {data &&
              <View style={{ alignItems: 'center' }}>
                <Text style={styles.weather}>{data.weather.label}</Text>
                {data.weather.icon(100)}
              </View>
            }
            {data && <WindspeedText data={data.wind_speed} />}

          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 50,
  },
  weather: {
    color: "white",
    fontSize: 24,
    textAlign: 'center',
  },
  temperature: {
    color: "orange",
    fontSize: 40,
    textAlign: 'center',
  }
});
