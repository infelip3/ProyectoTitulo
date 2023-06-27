// Simulación de datos de historias de animales rescatados
const historias = [
  {
    foto: src="images/perritofeliz.png",
    historia: 'Esta es la historia de Tomatin...'
  },
  {
    foto: src="images/perritotoybien.png",
    historia: 'A este perrito le pusimos "Despreocupado"'
  },
  {
    foto: src="images/perrocuidador.png",
    historia: 'Este lo llamamos "El Conserje"'
  },
  {
    foto: src="images/perrofantasma.png",
    historia: 'Aqui tenemos a Fantasmin'
  },
  {
    foto: src="images/perrotrabajador.png",
    historia: 'Por supuesto no podia faltar "Perrito Universitario"'
  },
  {
    foto: src="images/perropazinterior.png",
    historia: 'Este perrito lo llamamos "Croqueto"'
  },
  // Agrega más historias aquí...
];

// Función para mostrar las historias en la página
function mostrarHistorias() {
  const historiasContainer = document.getElementById('historias-container');

  historias.forEach((historia) => {
    const historiaDiv = document.createElement('div');

    const fotoImg = document.createElement('img');
    fotoImg.src = historia.foto;
    fotoImg.alt = 'Foto del animal rescatado';

    const historiaP = document.createElement('p');
    historiaP.textContent = historia.historia;

    historiaDiv.appendChild(fotoImg);
    historiaDiv.appendChild(historiaP);

    historiasContainer.appendChild(historiaDiv);
  });
}

// Llama a la función para mostrar las historias al cargar la página
mostrarHistorias();