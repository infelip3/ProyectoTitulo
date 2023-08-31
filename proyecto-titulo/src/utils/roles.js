import { getCollectionData } from "./firestore"

const getRoles = () => getCollectionData('roles');

export {
  getRoles,
}