import { getCollectionData } from '../utils/firestore.js';

const getUserByEmail = async (email) => {
  const users = await getCollectionData('users');
  return users.find((userItem) => userItem.email === email);
}

export {
  getUserByEmail,
}