import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { ErrorMsg } from '../../components/ErrorMsg';
import { TodayWeatherType, fetchTodayWeather } from '../../utils/api';
import { useAppContext } from '../../utils/appContext';

export default function TodayScreen() {
  const { location, setLocationList, errorMsg, setErrorMsg } = useAppContext();
  const [data, setData] = useState<TodayWeatherType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        if (location) {
          const weatherData = await fetchTodayWeather(location);
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
        <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
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
                  {item.time} {item.temperature.toFixed(1)}°C {item.wind_speed.toFixed(1)}km/h  {item.weather}
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
    fontSize: 16,
    textAlign: 'center',
  }
});
