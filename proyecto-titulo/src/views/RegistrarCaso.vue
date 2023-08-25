<script setup>
import { ref } from 'vue';
import router from '../router';
import { regions } from '../utils/locations.js';
import { 
  types,
  levels,
  storeCase
} from '../utils/cases.js';

const cities = ref([]);
const communes = ref([]);

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

const handleSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const caseData = Object.fromEntries(formData.entries());

  const storedCase = storeCase(caseData);
  console.log('Case stored successfully', storedCase);

  router.push('/');
};
</script>

<template>
  <div class="container mt-4 mb-4">
    <form @submit="handleSubmit">
      <div class="row">
        <div class="col-12">
          <h1>Registrar Caso</h1>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Tipo de reporte</label>
            <select name="type" id="type" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(typeItem, index) of types" :value="typeItem.value" :key="`type-${index}`">{{ typeItem.title }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="level">Criticidad</label>
            <select name="level" id="level" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(level, index) of levels" :value="level.value" :key="`level-${index}`">{{ level.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select name="region" id="region" class="form-select" @change="(evt) => handleRegionChange(evt.target.value)">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(region, index) of regions" :value="region.name" :key="`region-${index}`">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <select name="city" id="city" class="form-select" @change="(evt) => handleCityChange(evt.target.value)">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(city, index) of cities" :value="city.name" :key="`city-${index}`">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="commune">Comuna</label>
            <select name="commune" id="commune" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(commune, index) of communes" :value="commune" :key="`commune-${index}`">{{ commune }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="email">Ingrese su correo</label>
            <input type="email" class="form-control" id="email" name="email">
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="form-group">
            <label for="description">Describa el evento en pocas palabras</label>
            <textarea class="form-control" name="description" id="description" rows="5"></textarea>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="form-group">
            <label for="attachments">Adjuntar archivo</label>
            <input type="file" class="form-control" id="attachments" name="attachments">
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Registrar caso</button>
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