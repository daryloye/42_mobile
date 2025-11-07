import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { useAtom } from 'jotai';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { entriesListAtom } from '../utils/atoms';
import { Feeling, feelings, IconNames } from '../utils/types';

const mapFeelingTypeToIcon = (t: Feeling): IconNames => {
  return feelings.find((f) => f.type === t)!.icon
}

function Date({ date }: { date: any }) {
  const day = dayjs(date);
  return (
    <View style={styles.dateContainer}>
      <Text style={styles.date}>{day.format('DD')}</Text>
      <Text style={styles.date}>{day.format('MMMM')}</Text>
      <Text style={styles.date}>{day.format('YYYY')}</Text>
    </View>
  )
}

export function EntryList() {
  const [entriesList, setEntriesList] = useAtom<QuerySnapshot<DocumentData, DocumentData> | null>(entriesListAtom);

  const handlePress = (item: any) => {
    console.log('hello');
  }

  const data = entriesList?.docs.map((item) => ({
    id: item.id,
    email: item.data().email,
    timestamp: item.data().timestamp,
    title: item.data().title,
    content: item.data().content,
    feeling: item.data().feeling
  })) || [];

  console.log(data);

  return (
    <FlatList
      style={styles.listContainer}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={
        ({ item }) => (

          <Pressable 
            style={styles.itemContainer}
            onPress={(item) => handlePress(item)}
          >
            <Date date={item.timestamp} />
            <Ionicons name={mapFeelingTypeToIcon(item.feeling)} size={30} color="black" />
            <View style={styles.verticalLine} />

            <Text>{item.title}</Text>
          </Pressable>

        )}
      scrollEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#A8DCAB',
    width: '100%',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    padding: 20,
    gap: 20,
    backgroundColor: 'white',
  },

  verticalLine: {
    width: 2,
    height: '80%',
    backgroundColor: 'black',
    marginHorizontal: 15,
  },

  dateContainer: {
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
  }
})
