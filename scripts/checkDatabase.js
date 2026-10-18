const pool = require('../src/config/database');

async function comprobarConexion() {
  try {
    const resultado = await pool.query(`
      SELECT
        current_database() AS base,
        current_schema() AS esquema,
        current_user AS usuario
    `);

    console.log('Conexión exitosa:');
    console.table(resultado.rows);
  } catch (error) {
    console.error('No se pudo conectar:', error.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

comprobarConexion();