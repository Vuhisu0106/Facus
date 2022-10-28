import { updateDoc, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '~/firebase/config';

export const setDocument = async (collection, document, data) => {
    await setDoc(doc(db, collection, document), data);
};

export const updateDocument = async (collection, document, data) => {
    await updateDoc(doc(db, collection, document), data);
};

export const deleteDocument = async (collection, document) => {
    await deleteDoc(doc(db, collection, document));
};
