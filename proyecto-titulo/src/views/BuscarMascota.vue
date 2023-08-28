<script setup>
import { regions } from '../utils/locations.js';
import {
  species,
  sizes,
  genres,
  ages, 
  searchCases
} from '../utils/cases.js';

const handleSubmit = async (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const filtersData = Object.fromEntries(formData.entries());

  const foundCases = await searchCases(filtersData);

  alert(`Se encontraron ${foundCases.length} casos!`);
};
</script>

<template>
  <div class="container mt-4 mb-4">
    <form @submit="handleSubmit">
      <div class="row">
        <div class="col-12">
          <h1>Busca tu mascota</h1>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select name="region" id="region" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="region of regions" :value="region.name">{{ region.name }}</option>
              <option value="any">Cualquier región</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Especie</label>
            <select name="specie" id="specie" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="specie of species" :value="specie.value">{{ specie.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="size">Tamaño</label>
            <select name="size" id="size" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="size of sizes" :value="size.value">{{ size.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="genre">Género</label>
            <select name="genre" id="genre" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="genre of genres" :value="genre.value">{{ genre.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="age">Edad</label>
            <select name="age" id="age" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="age of ages" :value="age.value">{{ age.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Buscar</button>
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