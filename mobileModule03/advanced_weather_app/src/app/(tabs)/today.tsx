import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
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
        <View style={styles.container}>
          {errorMsg ? (
            <ErrorMsg />
          ) : (
            <View style={styles.container}>
              {/* Location */}
              {location && <LocationText location={location} />}

              {/* Weather data table */}
              {data && <TemperatureChart data={data.map((item) => item.temperature)}/>}

              {/* Weather + Wind Speed */}
              {data &&
                <ScrollView
                  horizontal
                  nestedScrollEnabled
                  contentContainerStyle={{ paddingHorizontal: 12, alignItems: 'center' }}
                  style={{ alignSelf: 'stretch', borderColor: 'red', borderWidth: 1 }}>
                  {data.map((item, i) => (
                    <View key={i} style={{ borderColor: 'blue', borderWidth: 1 }} onStartShouldSetResponder={() => true}>
                      <Text>{item.time}</Text>
                      {item.weather.icon(30)}
                      <Text>{item.temperature}</Text>
                      <WindspeedText data={item.wind_speed} />
                    </View>
                  ))}
                </ScrollView>
              }
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
