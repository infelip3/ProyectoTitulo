<script setup>
import { ref, onMounted } from 'vue';
import router from '../router';
import Swal from 'sweetalert2';
import { getRegions } from '../utils/locations.js';
import { 
  getTypes,
  getLevels,
  getSpecies,
  getSizes,
  getGenres,
  getAges,
  storeCase
} from '../utils/cases.js';

const types = ref([]);
const levels = ref([]);
const species = ref([]);
const sizes = ref([]);
const genres = ref([]);
const ages = ref([]);
const regions = ref([]);
const cities = ref([]);
const communes = ref([]);
const base64Image = ref('');

const handleRegionChange = async (regionId) => {
  const selectedRegion = regions.value.find(region => region.id === regionId);
  cities.value = selectedRegion ? selectedRegion.cities : [];

  document.getElementById('city').value = '';
  document.getElementById('commune').value = '';
};

const handleCityChange = (cityId) => {
  const citySelected = cities.value.find(cityItem => cityItem.id === cityId);
  communes.value = citySelected ? citySelected.communes : [];

  document.getElementById('commune').value = '';
};

const validateForm = (form, errors) => {
  form.classList.remove('was-validated');

  // Clear existing error messages
  const errorFields = form.querySelectorAll('.form-control.is-invalid');
  errorFields.forEach((field) => {
    field.classList.remove('is-invalid');
    field.classList.remove('is-valid');
  });

  form.querySelectorAll('.form-control,.form-select').forEach((field) => {
    field.addEventListener('change', () => {
      field.classList.remove('is-invalid');
      field.classList.remove('is-valid');
    });

    if(Object.keys(errors).includes(field.name))
    {
      field.classList.add('is-invalid');
    }
    else
    {
      field.classList.add('is-valid');
    }
  });

  // Display errors
  for (const field in errors) {
    const fieldElement = form.querySelector(`[name="${field}"]`);
    if (fieldElement) {
      fieldElement.classList.add('is-invalid');
    }
  }
}

const handleImageChange = (event) => {
  const selectedFile = event.target.files[0];

  if (selectedFile) {
    const reader = new FileReader();
    reader.onload = () => {
      base64Image.value = reader.result;
    };
    reader.readAsDataURL(selectedFile);
  }
}

const handleSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.target;

  const formData = new FormData(form);
  const caseData = Object.fromEntries(formData.entries());
  delete caseData.attachments;
  caseData.image = base64Image.value ?? null;

  storeCase(caseData)
    .then(() => {
      Swal.fire({
        title: 'Caso registrado',
        text: 'Su caso ha sido registrado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
        .then(() => {
          router.push('/');
        });
    })
    .catch((errorResponse) => {
      if(errorResponse.errors)
      {
        validateForm(form, errorResponse.errors);
      }
    });
};

onMounted(async () => {
  // Set required fields
  document.querySelectorAll('form [required]').forEach((requiredField) => {
    requiredField.previousElementSibling.classList.add('required');
  });
  
  types.value = await getTypes();
  levels.value = await getLevels();
  species.value = await getSpecies();
  sizes.value = await getSizes();
  genres.value = await getGenres();
  ages.value = await getAges();
  regions.value = await getRegions();
    
  // TODO: Remove. For testing purposes
  const sleepTimeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  const getRandomItemFromArray = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }
  // Auto-load form
  document.getElementById('type').value = getRandomItemFromArray(types.value).id;
  document.getElementById('level').value = getRandomItemFromArray(levels.value).id;
  document.getElementById('specie').value = getRandomItemFromArray(species.value).id;
  document.getElementById('size').value = getRandomItemFromArray(sizes.value).id;
  document.getElementById('genre').value = getRandomItemFromArray(genres.value).id;
  document.getElementById('age').value = getRandomItemFromArray(ages.value).id;
  await sleepTimeout(0);
  const selectRegion = document.getElementById('region');
  selectRegion.value = getRandomItemFromArray(regions.value).id;
  await handleRegionChange(selectRegion.value);
  await sleepTimeout(0);
  const selectCity = document.getElementById('city');
  selectCity.value = getRandomItemFromArray(cities.value).id;
  handleCityChange(selectCity.value);
  await sleepTimeout(0);
  const selectCommune = document.getElementById('commune');
  selectCommune.value = getRandomItemFromArray(communes.value);
  document.getElementById('description').value = 'This is a example description for an example case';
});
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
            <select name="type" id="type" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(typeItem, index) of types" :value="typeItem.id" :key="`type-${index}`">{{ typeItem.title }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="level">Criticidad</label>
            <select name="level" id="level" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(level, index) of levels" :value="level.id" :key="`level-${index}`">{{ level.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select name="region" id="region" class="form-select" @change="(evt) => handleRegionChange(evt.target.value)" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(region, index) of regions" :value="region.id" :key="`region-${index}`">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <select name="city" id="city" class="form-select" @change="(evt) => handleCityChange(evt.target.value)" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(city, index) of cities" :value="city.id" :key="`city-${index}`">{{ city.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="commune">Comuna</label>
            <select name="commune" id="commune" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(commune, index) of communes" :value="commune" :key="`commune-${index}`">{{ commune }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Especie</label>
            <select name="specie" id="specie" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="specie of species" :value="specie.id">{{ specie.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="size">Tamaño</label>
            <select name="size" id="size" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="size of sizes" :value="size.id">{{ size.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="genre">Género</label>
            <select name="genre" id="genre" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="genre of genres" :value="genre.id">{{ genre.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="age">Edad</label>
            <select name="age" id="age" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="age of ages" :value="age.id">{{ age.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="attachments">Adjuntar archivo</label>
            <input type="file" class="form-control" id="attachments" name="attachments" @change="handleImageChange">
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="form-group">
            <label for="description">Describa el evento en pocas palabras</label>
            <textarea class="form-control" name="description" id="description" rows="5" required></textarea>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary mt-3">Registrar caso</button>
    </form>
  </div>
</template>

<style lang="scss">
.form-group {
  label {
    &.required {
      &:after {
        content: ' *';
        color: red;
      }
    }
  }
}
</style>