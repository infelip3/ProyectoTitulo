<script setup>
import { ref, onMounted } from 'vue';
import { getRegions } from '@/utils/locations.js';
import { getTypes, getLevels, getSpecies, generatePlusReport } from '@/utils/cases.js';

const types = ref([]);
const levels = ref([]);
const species = ref([]);
const regions = ref([]);
const cities = ref([]);
const communes = ref([]);
const searchResults = ref(null);
const isLoading = ref(false);

const handleRegionChange = async (regionId) => {
  const selectedRegion = regions.value.find((region) => region.id === regionId);
  cities.value = selectedRegion ? selectedRegion.cities : [];
};

const handleCityChange = (cityId) => {
  const citySelected = cities.value.find((cityItem) => cityItem.id === cityId);
  communes.value = citySelected ? citySelected.communes : [];
};

const handleSubmit = async (evt) => {
  evt.preventDefault();
  isLoading.value = true;
  const form = evt.target;
  const formData = new FormData(form);
  const filtersData = Object.fromEntries(formData.entries());

  try {
    const foundCases = await generatePlusReport(filtersData);
    searchResults.value = foundCases;
  } catch (error) {
    searchResults.value = [];
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  // Set required fields
  document.querySelectorAll('form [required]').forEach((requiredField) => {
    requiredField.previousElementSibling.classList.add('required');
  });

  types.value = await getTypes();
  levels.value = await getLevels();
  species.value = await getSpecies();
  regions.value = await getRegions();
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
              <option
                v-for="(typeItem, index) of types"
                :key="`type-${index}`"
                :value="typeItem.id"
              >
                {{ typeItem.title }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="level">Criticidad</label>
            <select name="level" id="level" class="form-select" required>
              <option value="any" selected>Cualquier criticidad</option>
              <option v-for="(level, index) of levels" :value="level.id" :key="`level-${index}`">
                {{ level.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select
              name="region"
              id="region"
              class="form-select"
              @change="(evt) => handleRegionChange(evt.target.value)"
            >
              <option value="any" selected>Cualquier región</option>
              <option
                v-for="(region, index) of regions"
                :key="`region-${index}`"
                :value="region.id"
              >
                {{ region.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <select
              name="city"
              id="city"
              class="form-select"
              @change="(evt) => handleCityChange(evt.target.value)"
              required
            >
              <option value="any" selected>Cualquier ciudad</option>
              <option v-for="(city, index) of cities" :value="city.id" :key="`city-${index}`">
                {{ city.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="commune">Comuna</label>
            <select name="commune" id="commune" class="form-select" required>
              <option value="any" selected>Cualquier comuna</option>
              <option
                v-for="(commune, index) of communes"
                :value="commune"
                :key="`commune-${index}`"
              >
                {{ commune }}
              </option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Especie</label>
            <select name="specie" id="specie" class="form-select">
              <option value="any" selected>Cualquier especie</option>
              <option
                v-for="(specie, index) of species"
                :key="`specie-${index}`"
                :value="specie.id"
              >
                {{ specie.name }}
              </option>
            </select>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3" :disabled="isLoading">
        <span
          v-show="isLoading"
          class="spinner-grow spinner-grow-sm"
          role="status"
          aria-hidden="true"
          style="margin-right: 5px"
        ></span>
        <span class="sr-only">{{ isLoading ? 'Buscando..' : 'Buscar' }}</span>
      </button>
    </form>
  </div>
  <div v-if="searchResults !== null" class="container mt-4 mb-4">
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
      <tbody v-if="searchResults.length > 0">
        <tr v-for="(result, index) of searchResults" :key="`result-${index}`">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ result.type.title }}</td>
          <td>{{ result.level.name }}</td>
          <td>{{ result.region.name }}</td>
          <td>{{ result.city.name }}</td>
          <td>{{ result.commune }}</td>
          <td>{{ result.specie.name }}</td>
          <td>{{ new Date(result.date).toDateString() }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td colspan="8" class="text-center">No se encontraron resultados</td>
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
