import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import { atom } from 'jotai';

export const modalVisibleAtom = atom<boolean>(false);
export const entriesListAtom = atom<QuerySnapshot<DocumentData, DocumentData> | null>(null);
