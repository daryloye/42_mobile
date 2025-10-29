import { useContext, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchLocations, LocationType } from '../utils/api';
import { CoordinateContext } from '../utils/coordinateProvider';

export function SearchBar() {
  const { coordinate, setCoordinate } = useContext(CoordinateContext);
  const [query, setQuery] = useState<string>('');
  const [locationList, setLocationList] = useState<LocationType[] | null>(null);

  const handleChangeText = async (text: string) => {
    setQuery(text);
    
    const locationList = await fetchLocations(text) as LocationType[];
    setLocationList(locationList);
  }

  const handleSubmit = () => {
    console.log('setting coordinate');
    setCoordinate(null); // you can decide what to store here
  };

  const data = [
    {title: 'aaa', desc: 'b'}, 
    {title: 'aaab', desc: 'b'},
    {title: 'aaac', desc: 'b'},
    {title: 'aaad', desc: 'b'}, 
    {title: 'aaae', desc: 'b'},
    {title: 'aaaf', desc: 'b'},
    {title: 'aaag', desc: 'b'}, 
    {title: 'aaah', desc: 'b'},
    {title: 'aaai', desc: 'b'},
  ];

  const filtered = query.length === 0 
    ? [] 
    : data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search location..."
        placeholderTextColor='white'
        value={query}
        onChangeText={(text) => handleChangeText(text)}
        onSubmitEditing={handleSubmit}
      />
      {locationList && locationList.length > 0 && (
        <View style={styles.listContainer}>
          <FlatList
            data={locationList}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="always"
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setQuery(item.name)}>
                <Text style={styles.listItem}>{item.name} {item.admin1}, {item.country}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    elevation: 10,
    marginLeft: 10,
  },
  input: {
    height: 40,
    color: 'white',
  },
  listContainer: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'grey',
    zIndex: 9999,
  },
  listItem: {
    padding: 10,
  },
});
