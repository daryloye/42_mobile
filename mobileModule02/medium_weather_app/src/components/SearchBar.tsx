import { useContext, useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { SearchContext } from './SearchProvider';

export function SearchBar() {
    const { search, setSearch } = useContext(SearchContext);
    const [input, setInput] = useState('');

    // TODO: update this with city location
    const handleSubmit = () => {
        setSearch(null);
    }

    return (
        <TextInput
            style={styles.text}
            placeholder="Search location..."
            placeholderTextColor='white'
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSubmit}
        />
    )
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    marginLeft: 20,
  },
});