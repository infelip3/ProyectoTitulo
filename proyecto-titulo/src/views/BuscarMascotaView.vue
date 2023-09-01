<script setup>
import { ref, onMounted } from 'vue';
import { getRegions } from '../utils/locations.js';
import {
  getSpecies,
  getSizes,
  getGenres,
  getAges, 
  searchCases
} from '../utils/cases.js';

const species = ref([]);
const sizes = ref([]);
const genres = ref([]);
const ages = ref([]);
const regions = ref([]);
const searchResults = ref(null);
const isLoading = ref(false);

const handleSubmit = async (evt) => {
  evt.preventDefault();
  isLoading.value = true;
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
  finally
  {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Set required fields
  document.querySelectorAll('form [required]').forEach((requiredField) => {
    requiredField.previousElementSibling.classList.add('required');
  });

  species.value = await getSpecies();
  sizes.value = await getSizes();
  genres.value = await getGenres();
  ages.value = await getAges();
  regions.value = await getRegions();
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
              <option value="any" selected>Cualquier región</option>
              <option v-for="(region, index) of regions" :key="`region-${index}`" :value="region.id">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Especie</label>
            <select name="specie" id="specie" class="form-select">
              <option value="any" selected>Cualquier especie</option>
              <option v-for="(specie, index) of species" :key="`specie-${index}`" :value="specie.id">{{ specie.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="size">Tamaño</label>
            <select name="size" id="size" class="form-select">
              <option value="any" selected>Cualquier tamaño</option>
              <option v-for="(size, index) of sizes" :key="`size-${index}`"  :value="size.id">{{ size.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="genre">Género</label>
            <select name="genre" id="genre" class="form-select">
              <option value="any" selected>Cualquier género</option>
              <option v-for="(genre, index) of genres" :key="`genre-${index}`" :value="genre.id">{{ genre.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="age">Edad</label>
            <select name="age" id="age" class="form-select">
              <option value="any" selected>Cualquier edad</option>
              <option v-for="(age, index) of ages" :key="`age-${index}`" :value="age.id">{{ age.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">
        <span v-show="isLoading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-right: 5px;"></span>
        <span class="sr-only">{{ isLoading ? 'Buscando..' : 'Buscar' }}</span>  
      </button>
    </form>
  </div>
  <div v-if="searchResults !== null" class="container mt-4 mb-4">
    <div v-if="searchResults.length > 0" class="row">
      <div v-for="(result, index) in searchResults" :key="index" class="col-4 mt-2 mb-2">
        <div class="item">
          <img v-if="result.image" :src="result.image ?? `images/search/no-image.jpg`" class="card-img-top" alt="">
          <img v-else src="images/search/no-image.jpg" class="card-img-top rounded" alt="">
          <div class="content">
            <h4>{{ result.region.name }}</h4>
            <p>{{ result.description }}</p>
            <a class="btn btn-primary" :href="`mailto:${result.reporterEmail}`">Contactar a {{ result.reporterEmail }}</a>
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