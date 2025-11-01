import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { WeeklyTemperatureChart } from '../../components/Chart';
import { ErrorMsg } from '../../components/ErrorMsg';
import { LocationText } from '../../components/LocationText';
import { WeeklyWeatherScrollList } from '../../components/WeatherScrollList';
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
        {errorMsg ? (
          <ErrorMsg />
        ) : (
          <View style={styles.container}>

            {/* Location */}
            {location && <LocationText location={location} />}

            {/* Weather data table */}
            {data && <WeeklyTemperatureChart data={data} />}


            {/* Weather + Wind Speed */}
            {data && <WeeklyWeatherScrollList data={data} />}

          </View>
        )}
      </ScrollView>
    </TouchableWithoutFeedback >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingBottom: 50,
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
