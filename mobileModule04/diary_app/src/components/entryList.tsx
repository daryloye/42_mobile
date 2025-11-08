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
    <FlatList
      style={styles.listContainer}
      data={entriesList}
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
      scrollEnabled={false}
    />
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#A8DCAB',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
    padding: 20,
    gap: 20,
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
