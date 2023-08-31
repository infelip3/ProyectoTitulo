import { ref } from 'vue';
import { authClient } from './firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.3.0/firebase-auth.js";

const loggedUser = ref(null);

onAuthStateChanged(authClient, (user) => {
  loggedUser.value = user
    ? {
      id: user.uid,
      email: user.email
    }
    : null;
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
