import { FlatList, StyleSheet, Text, View } from "react-native";
import { TodayWeatherType, WeeklyWeatherType } from '../utils/api';
import { WindspeedText } from './WindspeedText';

export function TodayWeatherScrollList({ data }: { data: TodayWeatherType[] }) {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (

          <View style={styles.container}>
            <Text style={styles.time}>{item.time}</Text>
            {item.weather.icon(30)}
            <Text style={styles.temperature}>{item.temperature.toFixed(1)}°C</Text>
            <WindspeedText data={item.wind_speed} />
          </View>

        )}
      />
    </View>
  )
}

export function WeeklyWeatherScrollList({ data }: { data: WeeklyWeatherType[] }) {
  return (
    <View style={{ alignSelf: 'stretch' }}>
      <FlatList
        data={data}
        horizontal
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (

          <View style={styles.container}>
            <Text style={styles.time}>{item.date.substring(8,10)}/{item.date.substring(5,7)}</Text>
            {item.weather.icon(30)}
            <Text style={styles.max_temperature}>{item.max_temperature.toFixed(1)}°C max</Text>
            <Text style={styles.min_temperature}>{item.min_temperature.toFixed(1)}°C min</Text>
          </View>

        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(105, 85, 35, 0.5)',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 10,
  },
  time: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  temperature: {
    color: 'orange',
    fontSize: 20,
    textAlign: 'center',
  },
  max_temperature: {
    color: '#dd2d4a',
    fontSize: 20,
    textAlign: 'center',
  },
  min_temperature: {
    color: '#4ba3c3',
    fontSize: 20,
    textAlign: 'center',
  }
});
