const mysql = require('mysql');

// Configura los parámetros de conexión a la base de datos
const connection = mysql.createConnection({
  host: '34.176.137.184', 
  user: 'sa',
  password: '668201Fr',
  database: 'furrybd',
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