const mysql = require('mysql');

// Configura los parámetros de conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', 
  user: 'tu_usuario',
  password: 'tu_contraseña',
  database: 'nombre_de_tu_base_de_datos',
});

// Conecta a la base de datos
connection.connect((err) => {
  if (err) throw err;
  console.log('Conexión exitosa a la base de datos');
});

// Cierra la conexión al finalizar
process.on('SIGINT', () => {
  connection.end();
});