import { ref } from 'vue';
import { authClient } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";
import { getUserByEmail } from './users';

const loggedUser = ref(null);

onAuthStateChanged(authClient, async (authUser) => {
  const user = authUser 
    ? await getUserByEmail(authUser.email)
    : null;

  loggedUser.value = user;
});

const signInUser = (loginData) => signInWithEmailAndPassword(authClient, loginData.email, loginData.password);

const signOutUser = () => signOut(authClient);

const getLoggedUser = () => {
  return loggedUser.value;
}

export {
  getLoggedUser,
  signInUser,
  signOutUser,
};
