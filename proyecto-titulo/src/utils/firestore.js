import { firestoreClient } from '@/utils/firebase';
import {
  addDoc,
  collection,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js';

const getCollectionData = async (collectionName) => {
  const querySnapshot = await getDocs(collection(firestoreClient, collectionName));
  const collectionData = [];
  querySnapshot.forEach((doc) => {
    collectionData.push({ id: doc.id, ...doc.data() });
  });

  return collectionData;
};

const getSubCollectionData = async (collectionName, collectionId, subCollectionName) => {
  const querySnapshot = await getDocs(
    collection(firestoreClient, collectionName, collectionId, subCollectionName),
  );
  const subCollectionData = [];
  querySnapshot.forEach((doc) => {
    subCollectionData.push({ id: doc.id, ...doc.data() });
  });

  return subCollectionData;
};

const addDocumentToCollection = async (collectionName, documentData) =>
  addDoc(collection(firestoreClient, collectionName), documentData);

export { getCollectionData, getSubCollectionData, addDocumentToCollection };
