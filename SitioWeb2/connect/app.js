const mysql = require('mysql');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

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

  // Obtener los valores de los filtros del formulario
  const tipo_reporte = 'valor_tipo_reporte';
  const ubicacion = 'valor_ubicacion';
  const estado = 'valor_estado';
  const criticidad = 'valor_criticidad';
  const fecha_reporte = 'valor_fecha_reporte';
  const usuario_reporte = 'valor_usuario_reporte';

  // Consulta SQL para obtener los datos del reporte basados en los filtros
  const sql = `SELECT * FROM tu_tabla WHERE tipo_reporte = '${tipo_reporte}' AND ubicacion = '${ubicacion}' AND estado = '${estado}' AND criticidad = '${criticidad}' AND fecha_reporte = '${fecha_reporte}' AND usuario_reporte = '${usuario_reporte}'`;

  // Ejecutar la consulta SQL
  connection.query(sql, (err, results) => {
    if (err) throw err;

    // Crear el archivo CSV
    const filename = 'reporte.csv';
    const writer = csvWriter();
    writer.pipe(fs.createWriteStream(filename));

    // Escribir los encabezados del archivo CSV
    writer.write(['Campo1', 'Campo2', 'Campo3']); // Reemplaza con los nombres de tus columnas

    // Escribir los datos del reporte en el archivo CSV
    results.forEach((row) => {
      writer.write([row.campo1, row.campo2, row.campo3]); // Reemplaza con los nombres de tus columnas
    });

    writer.end();

    console.log(`Reporte generado: ${filename}`);

    // Cierra la conexión a la base de datos
    connection.end();
  });
});

// Captura la señal SIGINT (Ctrl+C) para cerrar la conexión antes de salir
process.on('SIGINT', () => {
  connection.end();
});
