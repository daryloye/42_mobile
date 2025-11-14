import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, query } from 'firebase/firestore';
import { DatabaseAddEntryType, DatabaseGetEntryType, ModalEntryType } from '../utils/types';

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


export async function addEntry(entry: ModalEntryType) {
  try {
    const doc: DatabaseAddEntryType = {
      email: auth.currentUser?.email,
      timestamp: Date.now(),
      title: entry.entryTitle,
      feeling: entry.entryFeeling,
      content: entry.entryText,
    }

    const docRef = await addDoc(collection(db, `users/${auth.currentUser!.uid}/entries`), doc);
    
    console.log("Document written with ID:", docRef.id);
  } catch (e) {
    console.error("Error adding document:", e);
  }
}

export async function getEntries() {
  try {
    const q = query(collection(db, `users/${auth.currentUser!.uid}/entries`))
    const querySnapshot = await getDocs(q);
    
    const docs: DatabaseGetEntryType[] = querySnapshot?.docs.map((item) => ({
      id: item.id,
      email: item.data().email,
      timestamp: item.data().timestamp,
      title: item.data().title,
      content: item.data().content,
      feeling: item.data().feeling
    })) || [];
    
    const sortedDocs = [...docs].sort((a, b) => {
      return b.timestamp.toLocaleString().localeCompare(a.timestamp.toLocaleString());
    })

    return sortedDocs;
  } catch (e) {
    console.error("Error getting documents:", e);
  }
}

export async function deleteEntry(id: string) {
  try {
    await deleteDoc(doc(db, `users/${auth.currentUser!.uid}/entries`, id))
  } catch (e) {
    console.error("Error deleting document:", e);
  }
}
