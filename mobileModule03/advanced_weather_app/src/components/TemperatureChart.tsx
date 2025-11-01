import { LineChart, lineDataItem } from 'react-native-gifted-charts';

interface ValueWrapper<T> {
    value: T;
}

export function TemperatureChart({data} : {data: number[]}) {
    const newArray: ValueWrapper<number>[] = data.map((item: number) => {
        return { value: item };
    });
    console.log(newArray)

    return (
        <LineChart
            data={newArray as lineDataItem[]}
            spacing={10}
            noOfSections={4}
            xAxisLabelTexts={['0', '1', '2', '3']}
        />
    )
}
