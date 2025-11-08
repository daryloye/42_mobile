import { Ionicons } from '@expo/vector-icons';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { addEntryModalVisibleAtom } from '../utils/atoms';
import { addEntry } from '../utils/firebase';
import { Feeling, feelings, ModalEntryType } from '../utils/types';

export function AddEntryModal() {
  const [modalVisible, setModalVisible] = useAtom<boolean>(addEntryModalVisibleAtom);
  const [entryTitle, setEntryTitle] = useState<string>('');
  const [entryText, setEntryText] = useState<string>('');
  const [entryFeeling, setEntryFeeling] = useState<Feeling>(Feeling.Happy);

  const handleClose = () => {
    setModalVisible(false);
    setEntryTitle('');
    setEntryText('');
    setEntryFeeling(Feeling.Happy);
  }

  const handleSubmit = async () => {
    setModalVisible(false);
    const entry: ModalEntryType = {entryTitle, entryText, entryFeeling};
    await addEntry(entry);
    setEntryTitle('');
    setEntryText('');
    setEntryFeeling(Feeling.Happy);
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
              <Text style={styles.headerText}>Add an entry</Text>

              <Pressable style={{ marginLeft: 'auto' }} onPress={handleClose}>
                <Ionicons name="close-outline" size={30} color="black" />
              </Pressable>
            </View>

            {/* Title Input */}
            <TextInput
              placeholder='Title'
              placeholderTextColor='grey'
              onChangeText={setEntryTitle}
              value={entryTitle}
              style={styles.textInput}
            />

            {/* Feelings Input */}
            <View style={styles.feelingInput}>
              {feelings.map((feeling) => (
                <Pressable
                  key={feeling.type}
                  onPress={() => setEntryFeeling(feeling.type)}
                  style={[ styles.feelingButton, { borderColor: entryFeeling === feeling.type ? 'red' : 'transparent' } ]}
                >
                  <Ionicons name={feeling.icon} size={30} color={'black'} />
                </Pressable>
              ))}
            </View>

            {/* Text Input */}
            <TextInput
              multiline
              placeholder='Text'
              placeholderTextColor='grey'
              onChangeText={setEntryText}
              value={entryText}
              style={styles.textInput}
              numberOfLines={10}
            />

            {/* Submit button */}
            <Pressable
              style={[styles.button]}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add</Text>
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

  textInput: {
    width: '100%',
    borderColor: 'grey',
    borderWidth: 1,
  },

  feelingInput: {
    flexDirection: 'row',
    gap: 10,
  },
  feelingButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3
  }
})
