import { Ionicons } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { SearchContext } from '../components/SearchProvider';

export function Header() {
  const { search, setSearch } = useContext(SearchContext);
  const [ input, setInput ] = useState('')

  const handlePress = () => {
    setSearch('Geolocation');
  }

  const handleSubmit = () => {
    setSearch(input);
  }

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name="search-outline" size={20} color='white' />
        <TextInput
          style={styles.text}
          placeholder="Search location..."
          placeholderTextColor='white'
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSubmit}
        />
      </View>
      <View style={styles.right}>
        <View style={styles.verticalLine} />
        <Pressable onPress={handlePress}>
          <Ionicons name="navigate" size={20} color='white' />
        </Pressable>
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
  text: {
    color: 'white',
    marginLeft: 20,
  },
  verticalLine: {
    width: 1,
    height: 30,
    backgroundColor: 'white',
    marginRight: 20,
    marginLeft: 10,
  },
});