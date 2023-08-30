<script setup>
import { ref, onMounted } from 'vue';
import { getLoggedUser } from './utils/auth';
import Loading from './components/Loading.vue';
import Navbar from './components/Navbar.vue';

const loggedUser = ref(null);

const updateLoggedUser = (user) => {
  loggedUser.value = user;
};

onMounted(() => {
  loggedUser.value = getLoggedUser();
});
</script>

<template>
  <div>
    <Loading />
    <Navbar :logged-user="loggedUser"/>
    <router-view @update-logged-user="updateLoggedUser"/>
  </div>
</template>