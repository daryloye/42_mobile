import { useContext } from 'react';
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { SearchContext } from '../../components/SearchProvider';


export default function WeeklyScreen() {
  const { search } = useContext(SearchContext);
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom', 'right', 'left']}>
      <Text style={styles.text}>Weekly</Text>
      <Text style={styles.text}>{search}</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: "black",
    fontSize: 24,
    fontWeight: 'bold',
    padding: 10,
  },
});
