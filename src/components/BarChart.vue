<script setup>
import { ref } from 'vue';
import Chart from 'chart.js/auto';

const titleRef = ref('');
const canvasRef = ref(null);

const handleReload = ({ title, labels, datasets }) => {
  if (canvasRef.value) {
    canvasRef.value.remove();
  }

  canvasRef.value = document.createElement('canvas');
  canvasRef.value.id = `chart-${Math.random() * 100}`;
  document.querySelector('#chart-container').appendChild(canvasRef.value);

  titleRef.value = title;
  const ctx = document.getElementById(canvasRef.value.id);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets,
    },
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

defineExpose({
  handleReload,
});
</script>

<template>
  <div>
    <h1>{{ titleRef }}</h1>
    <div id="chart-container"></div>
  </div>
</template>
