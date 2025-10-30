import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { fetchLocations } from '../utils/api';
import { LocationType, useAppContext } from '../utils/appContext';

export function SearchBar() {
  const { setLocation, locationList, setLocationList } = useAppContext();
  const [inputText, setInputText] = useState<string>('');

  const handleChangeText = async (text: string) => {
    setInputText(text);
    
    const locationList = await fetchLocations(text) as LocationType[];
    setLocationList(locationList);
  }

  const handleSubmitEditing = () => {
    console.log('Handle Submit');
    if (locationList && locationList.length > 0) {
      setLocation(locationList[0]);
      setInputText('');
      setLocationList(null);
    }
  };

  const handlePress = (location: LocationType) => {
    console.log('Handle Press');
    if (locationList && locationList.length > 0) {
      setLocation(location);
      setInputText('');
      setLocationList(null);
    }
  }

  return (
      <View style={styles.container}>

        {/* Text Box */}
        <TextInput
          style={styles.input}
          placeholder="Search location..."
          placeholderTextColor='white'
          value={inputText}
          onChangeText={(text) => handleChangeText(text)}
          onSubmitEditing={handleSubmitEditing}
        />

        {/* Selection List */}
        {locationList && locationList.length > 0 && (
          <View style={styles.listContainer}>
            <FlatList
              data={locationList}
              // keyExtractor={(item) => item.id.toString()}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handlePress(item)}>
                  <Text style={styles.listItem}>{item.city} {item.region}, {item.country}</Text>
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
