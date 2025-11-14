import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AddEntryModal } from '../../components/addEntryModal';
import { EntriesList } from '../../components/entriesList';
import { GetEntryModal } from '../../components/getEntryModal';
import { StatsList } from '../../components/statsList';
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
        <View style={styles.rowContainer}>

          {/* Profile Pic */}
          <Image
            style={styles.profilePic}
            source={{ uri: auth.currentUser?.photoURL || '' }}
          />

          {/* Name */}
          <Text style={styles.title}>{auth.currentUser?.displayName}</Text>

          {/* Exit Button */}
          <Pressable onPress={handleLogout}>
            <Ionicons name='exit-outline' size={40} color="black" />
          </Pressable>

        </View>

        {/* List of entries */}
        <View style={styles.entryListContainer}>
          <Text style={styles.entryListTitle}>Your last diary entries</Text>
          <EntriesList limitEntries={true} />
        </View>

        {/* Stats List */}
        <StatsList />

        <View style={{ flex: 1 }} />

        <Pressable style={styles.button} onPress={() => setAddEntryModalVisible(true)}>
          <Text style={styles.buttonText}>New diary entry</Text>
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    gap: 20,
    paddingHorizontal: 20,
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
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  entryListContainer: {
    width: '100%',
    backgroundColor: '#A8DCAB',
    flexGrow: 0,
    padding: 10,
  },
  entryListTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontStyle: 'italic' ,
  },
})
