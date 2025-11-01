import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';
import { TodayWeatherType } from '../utils/api';

export function TemperatureChart({ data }: { data: TodayWeatherType[] }) {
    const values = data.map((item) => ({ value: item.temperature }));
    const labels = data.map((item, i) => (i % 3 === 0 ? item.time : ''));
    const screenWidth = Dimensions.get('window').width;

    return (
        <View style={{ width: screenWidth - 40, alignSelf: 'center', borderColor: 'red', borderWidth: 1 }}>
            <LineChart
                data={values}
                xAxisLabelTexts={labels}
                noOfSections={4}
                yAxisLabelSuffix='°C'
                xAxisLabelTextStyle={{ fontSize: 10 }}
                xAxisTextNumberOfLines={2}
                adjustToWidth
                endSpacing={20}
            />
        </View>
    )
}
