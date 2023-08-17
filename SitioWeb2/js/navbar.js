// Construyo navbar
const navbar = 
`<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container container-navbar">
        <!-- Logo -->
        <a class="navbar-brand" href="index.html">
            <img src="./images/logo.png" class="img-fluid" alt="FurryCom">
        </a>
        <!-- Boton menu response -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Opciones menú -->
        <div class="collapse navbar-collapse  d-lg-flex justify-content-end" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="index.html">Inicio</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="busca-mascota.html">Busca tu mascota</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="historias.html">Historias</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="organizaciones.html">Organizaciones</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="quienes-somos.html">Quienes Somos</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="reportes.html">Generar Alertas</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="reportes-plus.html">ReportesPLUS</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="login.html">Login</a>
                </li>
            </ul>
        </div>
    </div>
</nav>`;

// Insertamos navbar en header
const header = document.getElementById('nav-placeholder');
header.insertAdjacentHTML('afterbegin', navbar);