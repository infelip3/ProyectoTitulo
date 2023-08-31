<script setup>
import Loading from './components/Loading.vue';
import Navbar from './components/Navbar.vue';
</script>

<template>
  <div>
    <Loading />
    <Navbar/>
    <router-view />
  </div>
</template>