// Ocultamos loading después de 'x' tiempo
setTimeout(() => {
    const loader = document.getElementById('page-loader');
    loader.classList.add('hide');
}, 1000);