<script setup>
import { regions } from '../utils/locations.js';
import { searchCases } from '../utils/cases.js';

const types = [
  {
    name: 'Perro',
    'value': 'dog'
  },
  {
    name: 'Gato',
    value: 'cat'
  },
  {
    name: 'Conejo',
    value: 'rabbit'
  },
  {
    name: 'Cualquier tipo',
    value: 'all'
  }
];

const sizes = [
  {
    name: 'Pequeño',
    value: 'small'
  },
  {
    name: 'Mediano',
    value: 'medium'
  },
  {
    name: 'Grande',
    value: 'large'
  }
];

const genres = [
  {
    name: 'Macho',
    value: 'macho'
  },
  {
    name: 'Hembra',
    value: 'hembra'
  },
  {
    name: 'Cualquier género',
    value: 'all'
  }
];

const ages = [
  {
    name: 'Hasta 1 año',
    value: 'upto1'
  },
  {
    name: '1 a 5 años',
    value: '1to5'
  },
  {
    name: '6 a 10 años',
    value: '6to10'
  },
  {
    name: 'Cualquier edad',
    value: 'all'
  }
];

const handleSubmit = (evt) => {
  evt.preventDefault();
  const form = evt.target;
  const formData = new FormData(form);
  const filtersData = Object.fromEntries(formData.entries());

  // TODO: Replace by real data
  const foundCases = searchCases(filtersData);

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
            <select name="region" id="region" class="form-select" @change="(evt) => handleRegionChange(evt.target.value)">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="region of regions" :value="region.name">{{ region.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="type">Tipo</label>
            <select name="type" id="type" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="typeItem of types" :value="typeItem.name">{{ typeItem.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="size">Tamaño</label>
            <select name="size" id="size" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="size of sizes" :value="size.name">{{ size.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="genre">Género</label>
            <select name="genre" id="genre" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="genre of genres" :value="genre.name">{{ genre.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-6 mt-2">
          <div class="form-group">
            <label for="age">Edad</label>
            <select name="age" id="age" class="form-select">
              <option value='' selected hidden>Seleccione una opción..</option>
              <option v-for="age of ages" :value="age.name">{{ age.name }}</option>
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