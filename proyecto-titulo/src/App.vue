<script setup>
import VLoading from './components/VLoading.vue';
import VNavbar from './components/VNavbar.vue';
</script>

<template>
  <div>
    <VLoading />
    <VNavbar />
    <router-view />
  </div>
</template>
