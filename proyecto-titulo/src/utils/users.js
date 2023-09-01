import { getCollectionData } from '../utils/firestore.js';

const getUserByEmail = (email) => new Promise(
  async (resolve, reject) => {
    try
    {
      const users = await getCollectionData('users');
      const user = users.find((userItem) => userItem.email === email);

      resolve(user);
    }
    catch (error)
    {
      reject(error);
    }
  }
)

export {
  getUserByEmail,
}