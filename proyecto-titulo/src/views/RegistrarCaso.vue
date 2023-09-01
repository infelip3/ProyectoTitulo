<script setup>
import { ref, onMounted } from 'vue';
import router from '../router';
import Swal from 'sweetalert2';
import { getRegions } from '../utils/locations.js';
import { 
  types,
  levels,
  species,
  sizes,
  genres,
  ages,
  storeCase
} from '../utils/cases.js';

const regions = ref([]);
const cities = ref([]);
const communes = ref([]);
const base64Image = ref('');

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
      console.log(base64Image);
    };
    reader.readAsDataURL(selectedFile);
  }
}

const handleSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.target;

  const formData = new FormData(form);
  const caseData = Object.fromEntries(formData.entries());
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
      validateForm(form, errorResponse.errors);
    });
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

  regions.value = await getRegions();
  
  // Auto-load form
  await sleepTimeout(100);
  document.getElementById('type').value = types[0].value;
  document.getElementById('level').value = levels[0].value;
  document.getElementById('specie').value = species[0].value;
  document.getElementById('size').value = sizes[0].value;
  document.getElementById('genre').value = genres[0].value;
  document.getElementById('age').value = ages[0].value;
  const selectRegion = document.getElementById('region');
  selectRegion.value = regions[0].name;
  handleRegionChange(selectRegion.value);
  const selectCity = document.getElementById('city');
  await sleepTimeout(100);
  selectCity.value = regions[0].cities[0].name;
  handleCityChange(selectCity.value);
  const selectCommune = document.getElementById('commune');
  await sleepTimeout(100);
  selectCommune.value = regions[0].cities[0].communes[0];
  document.getElementById('email').value = 'some@email.com';
  document.getElementById('description').value = 'This is some case description';
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
              <option v-for="(typeItem, index) of types" :value="typeItem.value" :key="`type-${index}`">{{ typeItem.title }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="level">Criticidad</label>
            <select name="level" id="level" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(level, index) of levels" :value="level.value" :key="`level-${index}`">{{ level.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="region">Región</label>
            <select name="region" id="region" class="form-select" @change="(evt) => handleRegionChange(evt.target.value)" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(region, index) of regions" :value="region.name" :key="`region-${index}`">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="city">Ciudad</label>
            <select name="city" id="city" class="form-select" @change="(evt) => handleCityChange(evt.target.value)" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="(city, index) of cities" :value="city.name" :key="`city-${index}`">{{ city.name }}</option>
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
              <option v-for="specie of species" :value="specie.value">{{ specie.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="size">Tamaño</label>
            <select name="size" id="size" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="size of sizes" :value="size.value">{{ size.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="genre">Género</label>
            <select name="genre" id="genre" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="genre of genres" :value="genre.value">{{ genre.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="age">Edad</label>
            <select name="age" id="age" class="form-select" required>
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="age of ages" :value="age.value">{{ age.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="email">Ingrese su correo</label>
            <input type="email" class="form-control" id="email" name="email" required>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="form-group">
            <label for="description">Describa el evento en pocas palabras</label>
            <textarea class="form-control" name="description" id="description" rows="5" required></textarea>
          </div>
        </div>
        <div class="col-12 mt-2">
          <div class="form-group">
            <label for="attachments">Adjuntar archivo</label>
            <input type="file" class="form-control" id="attachments" name="attachments" @change="handleImageChange">
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