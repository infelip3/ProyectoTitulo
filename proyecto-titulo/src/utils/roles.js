import { getCollectionData } from './firestore';

const getRoles = () => getCollectionData('roles');

const getRoleByName = async (name) => {
  const roles = await getRoles();
  return roles.find((roleItem) => roleItem.name === name);
};

export { getRoles, getRoleByName };
