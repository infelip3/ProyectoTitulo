// Simulación de datos de historias de animales rescatados
const historias = [
  {
    foto: src="images/perritofeliz.png",
    titulo: 'Tomatin',
    historia: 'Esta es la historia de Tomatin...'
  },
  {
    foto: src="images/perritotoybien.png",
    titulo: 'Despreocupado',
    historia: 'A este perrito le pusimos "Despreocupado"'
  },
  {
    foto: src="images/perrocuidador.png",
    titulo: 'Conserje',
    historia: 'Este lo llamamos "El Conserje"'
  },
  {
    foto: src="images/perrofantasma.png",
    titulo: 'Fantasmin',
    historia: 'Aqui tenemos a Fantasmin'
  },
  {
    foto: src="images/perrotrabajador.png",
    titulo: 'Perrito Universitario',
    historia: 'Por supuesto no podia faltar "Perrito Universitario"'
  },
  {
    foto: src="images/perropazinterior.png",
    titulo: 'Croqueto',
    historia: 'Este perrito lo llamamos "Croqueto"'
  },
  // Agrega más historias aquí...
];

{/* <div class="row">            
    <div class="col-4">
        <div class="card">
            <img src="images/perritofeliz.png" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 cl  ass="card-title">Perrito Feliz</h5>
                <p class="card-text">Este perrito encontro un hogar feliz luego de muchos traumas.</p>
                <a href="#" class="btn btn-primary">Ver Historia</a>
            </div>
        </div>
    </div>
</div> */}

// Función para mostrar las historias en la página
function mostrarHistorias() {
  const historiasContainer = document.getElementById('historias-container');

  historias.forEach((hist) => {
    // Construyo col
    const colHistoria = document.createElement('div');
    colHistoria.classList.add('col-sm-4', 'mb-4');
    // Construyo card
    const cardHistoria = document.createElement('div');
    cardHistoria.classList.add('card');
    // Construyo body del card
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    // Imagen de la card
    const cardImg = document.createElement('img');
    cardImg.classList.add('card-img-top');
    cardImg.src = hist.foto;
    cardImg.alt = 'Foto del animal rescatado';

    // Titulo de la card
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = hist.titulo;

    // Texto de la card
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = hist.historia;

    // Link para ver historia
    const cardLink = document.createElement('a');
    cardLink.classList.add('btn', 'btn-primary');
    cardLink.href = '#';
    cardLink.textContent = 'Ver historia';    
    cardLink.setAttribute('data-bs-toggle', 'modal');
    cardLink.setAttribute('data-bs-target', '#staticBackdrop');

    // Construyo card
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(cardLink);
    cardHistoria.appendChild(cardImg);
    cardHistoria.appendChild(cardBody);

    // Historia creada, append a col
    colHistoria.appendChild(cardHistoria);

    historiasContainer.appendChild(colHistoria);
  });
}

// Llama a la función para mostrar las historias al cargar la página
mostrarHistorias();