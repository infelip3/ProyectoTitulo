<script setup>
import Loading from './components/Loading.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <Loading />
  <Navbar />
  <router-view />
</template>