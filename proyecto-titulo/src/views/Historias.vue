<script setup>
const stories = [
  {
    title: 'Tomatin',
    image: 'feliz.png',
    content: 'Esta es la historia de Tomatin...'
  },
  {
    title: 'Despreocupado',
    image: 'toy_bien.png',
    content: 'A este perrito le pusimos "Despreocupado"'
  },
  {
    title: 'Conserje',
    image: 'cuidador.png',
    content: 'Este lo llamamos "El Conserje"'
  },
  {
    title: 'Fantasmin',
    image: 'fantasma.png',
    content: 'Aqui tenemos a Fantasmin'
  },
  {
    title: 'Perrito Universitario',
    image: 'trabajador.png',
    content: 'Por supuesto no podia faltar "Perrito Universitario"'
  },
  {
    title: 'Croqueto',
    image: 'paz_interior.png',
    content: 'Este perrito lo llamamos "Croqueto"'
  },
];

const showStory = (story) => {
  alert(`Mostrando historia ${story.title}`);
};
</script>



<template>
  <div class="container mt-4 mb-4">
    <div class="row">
      <div v-for="story of stories" class="col-4 mt-2 mb-2">
        <div class="item">
          <img :src="`images/stories/${story.image}`" class="card-img-top" alt="">
          <div class="content">
            <h4>{{ story.title }}</h4>
            <p>{{ story.content }}</p>
            <button @click="showStory(story)" class="btn btn-primary">Ver historia</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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