import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { entriesListAtom, getEntryModalVisibleAtom, selectedEntryAtom } from '../utils/atoms';
import { DatabaseGetEntryType, mapFeelingTypeToIcon } from '../utils/types';

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

export function timestampToDateString(timestamp: any) {
  return dayjs(timestamp).format('YYYY-MM-DD');
}

export function EntriesList({ 
  limitEntries=false,
  filterDate=''
}: { 
  limitEntries?: Boolean,
  filterDate?: string
}) {
  const [getEntryModalVisible, setGetEntryModalVisible] = useAtom<boolean>(getEntryModalVisibleAtom);
  const [selectedEntry, setSelectedEntry] = useAtom<DatabaseGetEntryType | null>(selectedEntryAtom);
  const [entriesList, setEntriesList] = useAtom<DatabaseGetEntryType[] | undefined>(entriesListAtom);

  const handlePress = (item: DatabaseGetEntryType) => {
    setSelectedEntry(item);
    setGetEntryModalVisible(true);
  }

  var data = entriesList;
  if (data && limitEntries) {
    data = data.slice(0,2);
  }
  if (data && filterDate !== '') {
    data = data.filter((item) => timestampToDateString(item.timestamp) === filterDate)
  }

  return (
    <FlatList
      scrollEnabled={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={
        ({ item }) => (
          <Pressable
            style={styles.itemContainer}
            onPress={() => handlePress(item)}
          >
            {/* Date */}
            <Date date={item.timestamp} />

            {/* Feeling */}
            <Ionicons name={mapFeelingTypeToIcon(item.feeling)} size={30} color="black" />

            <View style={styles.verticalLine} />

            {/* Title */}
            <Text
              style={styles.text}
              numberOfLines={1}
              ellipsizeMode='tail'
            >
              {item.title}
            </Text>

          </Pressable>
        )}
    />
  )
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    gap: 20,
    backgroundColor: 'white',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  verticalLine: {
    width: 1,
    height: '80%',
    backgroundColor: 'black',
  },

  dateContainer: {
    alignItems: 'center',
  },
  date: {
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 18,
  },

  text: {
    flexShrink: 1,
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 30,
  }
})
