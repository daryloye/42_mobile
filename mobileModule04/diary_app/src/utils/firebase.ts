import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, getDocs, getFirestore, query } from 'firebase/firestore';
import { DatabaseEntryType, ModalEntryType } from '../utils/types';

const firebaseConfig = {
  apiKey: "AIzaSyCuhsXfgkw903nQwSs8p3Gf3A71m4u0WZU",
  authDomain: "mobile-diary-42.firebaseapp.com",
  projectId: "mobile-diary-42",
  storageBucket: "mobile-diary-42.firebasestorage.app",
  messagingSenderId: "677278137805",
  appId: "1:677278137805:web:a65b43022b63b04a0a9884",
  measurementId: "G-PRS5JRCF2J"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


// test db entry
export async function addEntry(entry: ModalEntryType) {
  try {
    const doc: DatabaseEntryType = {
      email: auth.currentUser?.email,
      timestamp: Date.now(),
      title: entry.entryTitle,
      feeling: entry.entryFeeling,
      content: entry.entryText,
    }

    const docRef = await addDoc(collection(db, `users/${auth.currentUser!.uid}/entries`), doc);
    
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export async function getEntries() {
  const q = query(collection(db, `users/${auth.currentUser!.uid}/entries`))
  const querySnapshot = await getDocs(q);
  return querySnapshot;
}
