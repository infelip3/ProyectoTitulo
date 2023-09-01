import { firestoreClient } from './firebase';
import { getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const getCollectionData = (collectionName) => new Promise(
  async (resolve, reject) => {
    try
    {
      const querySnapshot = await getDocs(collection(firestoreClient, collectionName));
      const collectionData = [];
      querySnapshot.forEach((doc) => {
        collectionData.push({ id: doc.id, ...doc.data() });
      });
      
      resolve(collectionData);
    }
    catch (error)
    {
      reject(error);
    }
  }
);

const getSubCollectionData = (collectionName, collectionId, subCollectionName) => new Promise(
  async (resolve, reject) => {
    try
    {
      const querySnapshot = await getDocs(collection(firestoreClient, collectionName, collectionId, subCollectionName));
      const subCollectionData = [];
      querySnapshot.forEach((doc) => {
        subCollectionData.push({ id: doc.id, ...doc.data() });
      });
      
      resolve(subCollectionData);
    }
    catch (error)
    {
      reject(error);
    }
  }
);

export {
  getCollectionData,
  getSubCollectionData,
};
