<script setup>
import { ref } from 'vue';
import router from '../router';
import { signInUser } from '../utils/auth';

const loginResult = ref('');

const handleSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const loginData = Object.fromEntries(formData.entries());

  signInUser(
    {
      email: loginData.email,
      password: loginData.password
    }
  )
    .then(() => {
      router.push('/');
    })
    .catch(() => {
      loginResult.value = 'Error al iniciar sesión';
    });
};
</script>

<template>
  <div class="container mt-4 mb-4">
    <form @submit="handleSubmit">
      <div class="row">
        <div class="offset-4 col-4">
          <h1>Login</h1>
        </div>
        <div class="offset-4 col-4 mt-2">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" name="email" value="admin@mail.com">
          </div>
        </div>
        <div class="offset-4 col-4 mt-2">
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" name="password" value="furryadmin1">
            <span>{{ loginResult }}</span>
          </div>
        </div>
        <div class="offset-4 col-4 mt-2">
          <button type="submit" class="btn btn-primary mt-3">Iniciar sesión</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
.form-group {
  label {
    &:after {
      content: ' *';
      color: red;
    }
  }
}
</style>