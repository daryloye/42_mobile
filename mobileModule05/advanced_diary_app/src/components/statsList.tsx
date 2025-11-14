import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { StyleSheet, Text, View } from 'react-native';
import { entriesListAtom } from '../utils/atoms';
import { DatabaseGetEntryType, Feeling, mapFeelingTypeToIcon } from '../utils/types';

export function StatsList() {
  const [entriesList, setEntriesList] = useAtom<DatabaseGetEntryType[] | undefined>(entriesListAtom);

  const entriesLength = entriesList ? entriesList?.length : 0;

  const feelingsCount: { [key in Feeling]?: number } = {};

  for (const entry of entriesList || []) {
    feelingsCount[entry.feeling] = (feelingsCount[entry.feeling] || 0) + 1;
  }

  return (
    <View style={styles.listContainer}>
      <Text style={styles.title}>Your feel for your {entriesLength} entries</Text>
  
      <View style={styles.itemContainer}>
      {Object.entries(feelingsCount).map(([feeling, value]) => (
        <View style={styles.items} key={feeling}>
          <Ionicons name={mapFeelingTypeToIcon(feeling as Feeling)} size={30} color="black" />
          <Text style={styles.text}>{(value / entriesLength * 100).toFixed(0)}%</Text>
        </View>
      ))}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    backgroundColor: '#cfe457ff',
    flexGrow: 0,
    padding: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 10,
    gap: 20,
    marginVertical: 5,
    borderRadius: 10,
  },
  items: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 15,
  },

  title: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic' ,
  },
  text: {
    flexShrink: 1,
    fontFamily: 'CedarvilleCursive_400Regular',
    fontSize: 20,
  }
})
