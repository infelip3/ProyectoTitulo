// Datos de regiones, ciudades y comunas en formato JSON
var ubicaciones = {
    "regiones": [
      {
        "nombre": "Región Metropolitana",
        "ciudades": [
          {
            "nombre": "Santiago",
            "comunas": [
              "Santiago",
              "Providencia",
              "Las Condes"
            ]
          },
          {
            "nombre": "Maipú",
            "comunas": [
              "Maipú",
              "Cerrillos",
              "Pudahuel"
            ]
          }
        ]
      },
      {
        "nombre": "Región de Valparaíso",
        "ciudades": [
          {
            "nombre": "Valparaíso",
            "comunas": [
              "Valparaíso",
              "Viña del Mar",
              "Concón"
            ]
          },
          {
            "nombre": "Quilpué",
            "comunas": [
              "Quilpué",
              "Villa Alemana"
            ]
          }
        ]
      }
    ]
  };
  
  // Función para cargar las opciones de regiones en el select
  function cargarRegiones() {
    var selectRegion = document.getElementById("region");
  
    // Recorrer las regiones y agregar las opciones al select
    for (var i = 0; i < ubicaciones.regiones.length; i++) {
      var opcion = document.createElement("option");
      opcion.value = i;
      opcion.text = ubicaciones.regiones[i].nombre;
      selectRegion.appendChild(opcion);
    }
  
    // Asignar un evento onchange al select de regiones
    selectRegion.onchange = cargarCiudades;
  }
  
  // Función para cargar las opciones de ciudades según la región seleccionada
  function cargarCiudades() {
    var selectRegion = document.getElementById("region");
    var selectCiudad = document.getElementById("ciudad");
  
    // Obtener el índice de la región seleccionada
    var indiceRegion = selectRegion.value;
  
    // Limpiar el select de ciudades
    selectCiudad.innerHTML = "";
  
    // Recorrer las ciudades de la región seleccionada y agregar las opciones al select
    for (var i = 0; i < ubicaciones.regiones[indiceRegion].ciudades.length; i++) {
      var opcion = document.createElement("option");
      opcion.value = i;
      opcion.text = ubicaciones.regiones[indiceRegion].ciudades[i].nombre;
      selectCiudad.appendChild(opcion);
    }
  
    // Llamar a la función cargarComunas para cargar las opciones de comunas de la primera ciudad
    cargarComunas();
  }
  
  // Función para cargar las opciones de comunas según la ciudad seleccionada
  function cargarComunas() {
    var selectRegion = document.getElementById("region");
    var selectCiudad = document.getElementById("ciudad");
    var selectComuna = document.getElementById("comuna");
  
    // Obtener los índices de la región y ciudad seleccionadas
    var indiceRegion = selectRegion.value;
    var indiceCiudad = selectCiudad.value;
  
    // Limpiar el select de comunas
    selectComuna.innerHTML = "";
  
    // Recorrer las comunas de la ciudad seleccionada y agregar las opciones al select
    for (var i = 0; i < ubicaciones.regiones[indiceRegion].ciudades[indiceCiudad].comunas.length; i++) {
      var opcion = document.createElement("option");
      opcion.value = i;
      opcion.text = ubicaciones.regiones[indiceRegion].ciudades[indiceCiudad].comunas[i];
      selectComuna.appendChild(opcion);
    }
  }
  
  // Llamar a la función cargarRegiones al cargar la página
  window.onload = cargarRegiones;

  function cargarUbicacion() {
    var selectUbicacion = document.getElementById("ubicacion");

    // Recorrer las regiones y agregar las opciones al select
    for (var i = 0; i < ubicaciones.regiones.length; i++) {
        var opcion = document.createElement("option");
        opcion.value = i;
        opcion.text = ubicaciones.regiones[i].nombre;
        selectUbicacion.appendChild(opcion);
    }

    // Asignar un evento onchange al select de ubicación
    selectUbicacion.onchange = cargarCiudades;

    // Mostrar la pregunta y la primera ubicación por defecto
    document.getElementById("question-ubicacion").style.display = "block";
    cargarCiudades();
}

// Llamar a la función cargarUbicacion al cargar la página
window.onload = cargarUbicacion;
  