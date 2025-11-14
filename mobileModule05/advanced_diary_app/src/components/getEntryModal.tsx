import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { useAtom } from 'jotai';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getEntryModalVisibleAtom, selectedEntryAtom } from '../utils/atoms';
import { deleteEntry } from '../utils/firebase';
import { DatabaseGetEntryType, mapFeelingTypeToIcon } from '../utils/types';

export function GetEntryModal() {
  const [modalVisible, setModalVisible] = useAtom<boolean>(getEntryModalVisibleAtom);
  const [selectedEntry, setSelectedEntry] = useAtom<DatabaseGetEntryType | null>(selectedEntryAtom);

  const handleClose = () => {
    setModalVisible(false);
    setSelectedEntry(null);
  }

  const handleDelete = async () => {
    setModalVisible(false);
    await deleteEntry(selectedEntry!.id);
  }

  return (
      <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalView}>
          <ScrollView contentContainerStyle={styles.modalContent}>

            {/* Header */}
            <View style={styles.header}>
              {selectedEntry && <Text style={styles.headerText}>{dayjs(selectedEntry.timestamp).format('dddd MMMM DD, YYYY')}</Text>}

              <Pressable style={{ marginLeft: 'auto' }} onPress={handleClose}>
                <Ionicons name="close-outline" size={30} color="black" />
              </Pressable>
            </View>

            <View style={styles.horizontalLine} />

            {/* Feelings */}
            {selectedEntry &&
              <View style={styles.feelingRow}>
                <Text style={styles.text}>
                  My feeling:{`\t\t`}
                </Text>
                <Ionicons name={mapFeelingTypeToIcon(selectedEntry.feeling)} size={30} color="black" />
              </View>
            }

            <View style={styles.horizontalLine} />

            {/* Content */}
            {selectedEntry && <Text style={styles.text}>{selectedEntry.content}</Text>}

            {/* Delete button */}
            <Pressable
              style={[styles.button]}
              onPress={handleDelete}>
              <Text style={styles.buttonText}>Delete this entry</Text>
            </Pressable>

          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    maxHeight: '80%',
    width: '85%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    gap: 15,
    padding: 20,
  },

  button: {
    backgroundColor: 'red',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerText: {
    marginRight: 'auto',
    fontSize: 20,
    fontWeight: '600'
  },

  horizontalLine: {
    width: '100%',
    height: 1,
    backgroundColor: 'black',
  },

  feelingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  }
})
