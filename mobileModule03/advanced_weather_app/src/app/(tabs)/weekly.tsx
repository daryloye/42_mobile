import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ErrorMsg } from '../../components/ErrorMsg';
import { WeeklyWeatherType, fetchWeeklyWeather } from '../../utils/api';
import { useAppContext } from '../../utils/appContext';

export default function WeeklyScreen() {
  const { location, setLocationList, errorMsg, setErrorMsg } = useAppContext();
  const [data, setData] = useState<WeeklyWeatherType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (location) {
          const weatherData = await fetchWeeklyWeather(location);
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
        <View style={styles.container}>
          {errorMsg ? (
            <ErrorMsg />
          ) : (
            <View>
              <Text style={styles.text}>
                {location?.city}{'\n'}
                {location?.region}{'\n'}
                {location?.country}{'\n'}
              </Text>

              {/* Weather data table */}
              {data?.map((item, i) => (
                <Text key={i} style={styles.table}>
                  {item.date} {item.min_temperature.toFixed(1)}°C {item.max_temperature.toFixed(1)}°C  {item.weather.label}
                </Text>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontSize: 16,
    textAlign: 'center',
  },
});
