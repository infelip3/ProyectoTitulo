import { getCollectionData, getSubCollectionData } from "./firestore"
import { getFirestore, addDoc, collection, getDocs, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-firestore.js";

const getRegions = async () => new Promise(
  async (resolve, reject) => {
    try
    {
      const regions = await getCollectionData('regions');
      for(const region of regions)
      {
        region.cities = await getSubCollectionData('regions', region.id, 'cities');
      }

      resolve(regions);
    }
    catch(erorr)
    {
      reject(error);
    }
  }
);

export {
  getRegions,
}