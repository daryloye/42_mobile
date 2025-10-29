import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GeolocationButton } from './GeolocationButton';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.left}>
        <Ionicons name="search-outline" size={20} color='white' />
        <SearchBar />
      </View>
      <View style={styles.right}>
        <View style={styles.verticalLine} />
        <GeolocationButton />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5b5d72',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative', // allow child absolute positioning
    zIndex: 10,           // allow search list to overlay
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: 'white',
    marginHorizontal: 15,
  },
});