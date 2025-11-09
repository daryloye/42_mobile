import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AddEntryModal } from '../../components/addEntryModal';
import { EntryList } from '../../components/entryList';
import { GetEntryModal } from '../../components/getEntryModal';
import { addEntryModalVisibleAtom, entriesListAtom, getEntryModalVisibleAtom } from '../../utils/atoms';
import { useLogout } from '../../utils/auth';
import { auth, getEntries } from '../../utils/firebase';
import { DatabaseGetEntryType } from '../../utils/types';

export default function ProfileScreen() {
  const [addEntryModalVisible, setAddEntryModalVisible] = useAtom<boolean>(addEntryModalVisibleAtom);
  const [getEntryModalVisible, setGetEntryModalVisible] = useAtom<boolean>(getEntryModalVisibleAtom);
  const [entriesList, setEntriesList] = useAtom<DatabaseGetEntryType[] | undefined>(entriesListAtom);

  const handleLogout = () => {
    useLogout();
    router.replace('/');
    setEntriesList([]);
  }

  const loadEntries = async () => {
    const entries = await getEntries();
    setEntriesList(entries);
  }

  useEffect(() => {
    // fetch diary entries when modals are hidden
    if (!addEntryModalVisible || !getEntryModalVisible) {
      loadEntries();
    }
  }, [addEntryModalVisible, getEntryModalVisible]);

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      
      <AddEntryModal />

      <GetEntryModal />

      <View style={styles.container}>
        <Text style={styles.title}>Welcome {auth.currentUser?.displayName}</Text>

        <EntryList />

        <View style={{flex: 1}}/> 

        <Pressable style={styles.button} onPress={() => setAddEntryModalVisible(true)}>
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
    fontFamily: 'CedarvilleCursive_400Regular',
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
