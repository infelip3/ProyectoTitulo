import { getCollectionData } from "./firestore"

const getRoles = () => getCollectionData('roles');

const getRoleByName = (name) => new Promise(
  async (resolve) => {
    try
    {
      const roles = await getRoles();
      const role = roles.find((roleItem) => roleItem.name === name);
      
      resolve(role);
    }
    catch (error)
    {
      resolve(null);
    }
  }
)

export {
  getRoles,
  getRoleByName
}