import { atom } from 'jotai';
import { DatabaseGetEntryType } from '../utils/types';

export const addEntryModalVisibleAtom = atom<boolean>(false);
export const getEntryModalVisibleAtom = atom<boolean>(false);
export const selectedEntryAtom = atom<DatabaseGetEntryType | null>(null);
export const entriesListAtom = atom<DatabaseGetEntryType[] | undefined>([]);
