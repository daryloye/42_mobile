import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import { TodayTemperatureChart } from '../../components/Chart';
import { ErrorMsg } from '../../components/ErrorMsg';
import { LocationText } from '../../components/LocationText';
import { TodayWeatherScrollList } from '../../components/WeatherScrollList';
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
            {data && <TodayTemperatureChart data={data} />}

            {/* Weather + Wind Speed */}
            {data && <TodayWeatherScrollList data={data} />}

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
  },
});
