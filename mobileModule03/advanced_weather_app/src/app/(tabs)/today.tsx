import { useEffect, useState } from 'react';
import { FlatList, Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { ErrorMsg } from '../../components/ErrorMsg';
import { LocationText } from '../../components/LocationText';
import { TemperatureChart } from '../../components/TemperatureChart';
import { WindspeedText } from '../../components/WindspeedText';
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
        {errorMsg ? (
          <ErrorMsg />
        ) : (
          <View style={styles.container}>

            {/* Location */}
            {location && <LocationText location={location} />}

            {/* Weather data table */}
            {data &&
              <View style={{ alignSelf: 'stretch', backgroundColor: 'rgba(105, 85, 35, 0.5)' }}>
                <TemperatureChart data={data} />
              </View>}

            {/* Weather + Wind Speed */}
            {data &&
              <View style={{ alignSelf: 'stretch' }}>
                <FlatList
                  data={data}
                  horizontal
                  keyExtractor={(_, i) => i.toString()}
                  renderItem={({ item }) => (

                    <View style={styles.weatherContainer}>
                      <Text style={styles.time}>{item.time}</Text>
                      {item.weather.icon(30)}
                      <Text style={styles.temperature}>{item.temperature.toFixed(1)}°C</Text>
                      <WindspeedText data={item.wind_speed} />
                    </View>

                  )}
                />
              </View>
            }
          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 50,
    gap: 20,
  },
  weatherContainer: {
    backgroundColor: 'rgba(105, 85, 35, 0.5)',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 15,
  },
  time: {
    color: 'white',
    fontSize: 24,
    textAlign: 'center',
  },
  temperature: {
    color: 'orange',
    fontSize: 24,
    textAlign: 'center',
  }
});
