<script setup>
import { ref, onMounted } from 'vue';
import { regions } from '../utils/locations.js';
import {
  species,
  sizes,
  genres,
  ages, 
  searchCases
} from '../utils/cases.js';

const searchResults = ref([]);

const handleSubmit = async (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const filtersData = Object.fromEntries(formData.entries());

  try
  {
    const foundCases = await searchCases(filtersData);
    searchResults.value = foundCases;
  }
  catch(error)
  {
    searchResults.value = [];
  }
};

// TODO: Remove. For testing purposes
onMounted(async () => {
  const sleepTimeout = async (ms) => new Promise(
    (resolve) => setTimeout(resolve, ms)
  );

  // Set required fields
  document.querySelectorAll('form [required]').forEach((requiredField) => {
    requiredField.previousElementSibling.classList.add('required');
  });

  // Auto-load form
  await sleepTimeout(100);
  document.getElementById('region').value = regions[0].name;
  document.getElementById('specie').value = species[0].value;
  document.getElementById('size').value = sizes[0].value;
  document.getElementById('genre').value = genres[0].value;
  document.getElementById('age').value = ages[0].value;
});
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
  <div class="container mt-4 mb-4">
    <div v-if="searchResults.length > 0" class="row">
      <div v-for="(result, index) in searchResults" :key="index" class="col-4 mt-2 mb-2">
        <div class="item">
          <img :src="result.image" class="card-img-top" alt="">
          <div class="content">
            <h4>{{ result.region }}</h4>
            <p>{{ result.description }}</p>
          </div>
        </div>
      </div>
    </div>
    <h3 v-else>
      <span>No se encontraron resultados</span>
    </h3>
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
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;

  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  .content {
    width: 100%;
  }
}
</style>