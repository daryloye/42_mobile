import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { TodayWeatherType, fetchTodayWeather } from '../../utils/api';
import { useAppContext } from '../../utils/appContext';

export default function TodayScreen() {
  const { location, setLocationList } = useAppContext();
  const [data, setData] = useState<TodayWeatherType[] | null>(null);

  useEffect(() => {
    const updatePage = async () => {
      if (location) {
        const weatherData = await fetchTodayWeather(location);
        setData(weatherData);
      }
    }

    updatePage();
  }, [location])

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setLocationList(null);
      }}
    >
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
          {location === null ? (
            <Text style={styles.error}>
              Geolocation is not available, please enable it in your App settings
            </Text>
          ) : (
            <View>
              <Text style={styles.text}>
                {location.city}{'\n'}
                {location.region}{'\n'}
                {location.country}{'\n'}
              </Text>

              {data && data.map((item, i) => (
                <Text key={i} style={styles.table}>
                  {item.time} {item.temperature.toFixed(1)} °C {item.weather}{'\n'} {item.wind_speed.toFixed(1)} km/h
                </Text>
              ))}
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
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
  },
  table: {
    color: "black",
    fontSize: 12,
    textAlign: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    padding: 20,
    textAlign: 'center',
  }
});