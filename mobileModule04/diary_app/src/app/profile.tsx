import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { EntryList } from '../components/entryList';
import { EntryModal } from '../components/entryModal';
import { entriesListAtom, modalVisibleAtom } from '../utils/atoms';
import { auth, getEntries } from '../utils/firebase';
import { useLogout } from '../utils/login';

export default function ProfileScreen() {
  const [modalVisible, setModalVisible] = useAtom<boolean>(modalVisibleAtom);
  const [entriesList, setEntriesList] = useAtom(entriesListAtom);

  const handleLogout = () => {
    useLogout();
    router.replace('/');
    setEntriesList(null);
  }

  const loadEntries = async () => {
    const entries = await getEntries();
    setEntriesList(entries);
  }

  useEffect(() => {
    if (!modalVisible) {
      loadEntries();
    }
  }, [modalVisible]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      <EntryModal />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome {auth.currentUser?.displayName}</Text>

        <EntryList />

        <View style={{flex: 1}}/> 

        <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>New diary entry</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: 'white',
    gap: 15,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
})
