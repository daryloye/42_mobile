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

export function EntryList() {
  const [getEntryModalVisible, setGetEntryModalVisible] = useAtom<boolean>(getEntryModalVisibleAtom);
  const [selectedEntry, setSelectedEntry] = useAtom<DatabaseGetEntryType | null>(selectedEntryAtom);
  const [entriesList, setEntriesList] = useAtom<DatabaseGetEntryType[] | undefined>(entriesListAtom);

  const handlePress = (item: DatabaseGetEntryType) => {
    setSelectedEntry(item);
    setGetEntryModalVisible(true);
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Your last diary entries</Text>

      <FlatList
        scrollEnabled={false}
        data={entriesList?.slice(0, 2)}
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
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    backgroundColor: '#A8DCAB',
    flexGrow: 0,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 5,
    padding: 10,
    gap: 20,
    backgroundColor: 'white',
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

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic' ,
  },
  text: {
    flexShrink: 1,
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 30,
  }
})
