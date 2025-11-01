import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { TodayWeatherType, WeeklyWeatherType } from '../utils/api';

export function TodayTemperatureChart({ data }: { data: TodayWeatherType[] }) {
    const values = data.map((item) => ({ value: item.temperature }));
    const labels = data.map((item, i) => (i % 3 === 0 ? item.time : ''));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today temperatures</Text>
            <LineChart
                data={values}
                xAxisLabelTexts={labels}

                noOfSections={4}
                width={350}
                rulesLength={350}
                spacing={12}
                initialSpacing={30}
                
                xAxisLabelTextStyle={styles.axisText}
                yAxisTextStyle={styles.axisText}
                yAxisLabelSuffix='°C'
                
                xAxisColor='white'
                yAxisColor='white'
                
                color='orange'
                dataPointsColor='white'
            />
        </View>
    )
}

export function WeeklyTemperatureChart({ data }: { data: WeeklyWeatherType[] }) {
    const values1 = data.map((item) => ({ value: item.max_temperature }));
    const values2 = data.map((item) => ({ value: item.min_temperature }));
    const labels = data.map((item) => (`${item.date.substring(8,10)}/${item.date.substring(5,7)}`));

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weekly temperatures</Text>
            <LineChart
                data={values1}
                data2={values2}
                xAxisLabelTexts={labels}
                // maxValue={Math.ceil(Math.max( ...data.map((item) => (item.max_temperature)))) + 10 }

                noOfSections={4}
                width={350}
                rulesLength={350}
                spacing={45}
                initialSpacing={30}
                
                xAxisLabelTextStyle={styles.axisText}
                yAxisTextStyle={styles.axisText}
                yAxisLabelSuffix='°C'
                
                xAxisColor='white'
                yAxisColor='white'
                
                color1='#dd2d4a'
                color2='#4ba3c3'
                dataPointsColor='white'
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        backgroundColor: 'rgba(105, 85, 35, 0.5)',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 5,
    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: 'center',
    },
    axisText: {
        color: 'white',
        fontSize: 10,
        textAlign: 'center',
        width: 30,
    }
})
