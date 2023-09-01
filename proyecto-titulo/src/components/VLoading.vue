<template>
  <div class="loading">
    <img src="/images/loader.gif" alt="" />
  </div>
</template>

<style>
.loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  color: black;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
}
</style>
