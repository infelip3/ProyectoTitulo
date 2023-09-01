import { getCollectionData, getSubCollectionData } from "./firestore"
import { getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const getRegions = async () => getCollectionData('regions');

const getCities = (regionId) => getSubCollectionData('regions', regionId, 'cities');

export {
  getRegions,
  getCities,
}