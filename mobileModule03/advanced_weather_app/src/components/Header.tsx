import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { GeolocationButton } from './GeolocationButton';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <View style={styles.container}>
      <Ionicons name="search-outline" size={20} color='white' />
      <SearchBar />
      <View style={styles.verticalLine} />
      <GeolocationButton />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    position: 'relative', // allow child absolute positioning
    zIndex: 10,           // allow search list to overlay
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: 'white',
    marginHorizontal: 15,
  },
});
