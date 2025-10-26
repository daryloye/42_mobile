import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { GeolocationButton } from './GeolocationButton';
import { SearchBar } from './SearchBar';

export function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="search-outline" size={20} color='white' />
        <SearchBar />
      </View>
      <View style={styles.right}>
        <View style={styles.verticalLine} />
        <GeolocationButton />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 10,
  },
});