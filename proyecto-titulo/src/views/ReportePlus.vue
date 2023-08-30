<script setup>
import { ref, onMounted } from 'vue';
import { regions } from '../utils/locations.js';
import {
  types,
  levels,
  species,
  generatePlusReport,
} from '../utils/cases.js';

const cities = ref([]);
const communes = ref([]);
const searchResults = ref([]);

const handleRegionChange = (region) => {
  const regionSelected = regions.find(regionItem => regionItem.name === region);
  cities.value = regionSelected ? regionSelected.cities : [];
  document.getElementById('city').value = '';
  document.getElementById('commune').value = '';
};

const handleCityChange = (city) => {
  const citySelected = cities.value.find(cityItem => cityItem.name === city);
  communes.value = citySelected ? citySelected.communes : [];
  document.getElementById('commune').value = '';
};

const handleSubmit = async (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const filtersData = Object.fromEntries(formData.entries());

  try
  {
    const foundCases = await generatePlusReport(filtersData);
    searchResults.value = foundCases;
  }
  catch(error)
  {
    searchResults.value = [];
  }
};

const translateType = (value) => {
  const type = types.find(typeItem => typeItem.value === value);
  return type ? type.title : '';
};

const translateCriticidad = (value) => {
  const level = levels.find(levelItem => levelItem.value === value);
  return level ? level.name : '';
};

const translateSpecie = (value) => {
  const specie = species.find(specieItem => specieItem.value === value);
  return specie ? specie.name : '';
};

onMounted(async () => {
  // Set required fields
  document.querySelectorAll('form [required]').forEach((requiredField) => {
    requiredField.previousElementSibling.classList.add('required');
  });
});
</script>

<template>
  <div class="container mt-4 mb-4">
    <form @submit="handleSubmit">
      <div class="row">
        <div class="col-12">
          <h1>Reporte PLUS</h1>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Tipo</label>
            <select name="type" id="type" class="form-select">
              <option value="any" selected>Cualquier tipo</option>
              <option v-for="typeItem of types" :value="typeItem.value">{{ typeItem.title }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="level">Criticidad</label>
            <select name="level" id="level" class="form-select" required>
              <option value="any" selected>Cualquier criticidad</option>
              <option v-for="(level, index) of levels" :value="level.value" :key="`level-${index}`">{{ level.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select name="region" id="region" class="form-select" @change="(evt) => handleRegionChange(evt.target.value)">
              <option value="any" selected>Cualquier región</option>
              <option v-for="region of regions" :value="region.name">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <select name="city" id="city" class="form-select" @change="(evt) => handleCityChange(evt.target.value)" required>
              <option value="any" selected>Cualquier ciudad</option>
              <option v-for="(city, index) of cities" :value="city.name" :key="`city-${index}`">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="commune">Comuna</label>
            <select name="commune" id="commune" class="form-select" required>
              <option value="any" selected>Cualquier comuna</option>
              <option v-for="(commune, index) of communes" :value="commune" :key="`commune-${index}`">{{ commune }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Especie</label>
            <select name="specie" id="specie" class="form-select">
              <option value="any" selected>Cualquier especie</option>
              <option v-for="specie of species" :value="specie.value">{{ specie.name }}</option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Buscar</button>
    </form>
  </div>
  <div id="report-container" class="container mt-4 mb-4">
    <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Tipo</th>
          <th scope="col">Criticidad</th>
          <th scope="col">Región</th>
          <th scope="col">Ciudad</th>
          <th scope="col">Comuna</th>
          <th scope="col">Especie</th>
          <th scope="col">Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(result, index) of searchResults">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ translateType(result.type) }}</td>
          <td>{{ translateCriticidad(result.level) }}</td>
          <td>{{ result.region }}</td>
          <td>{{ result.city }}</td>
          <td>{{ result.commune }}</td>
          <td>{{ translateSpecie(result.specie) }}</td>
          <td>{{ new Date(result.date).toDateString() }}</td>
        </tr>
      </tbody>
    </table>
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