const pool = require('../config/database');

const tabla = 'productos';
const clavePrimaria = 'id_producto';
const camposPermitidos = [
  'id_categoria',
  'nombre',
  'descripcion',
  'unidad_medida',
];

async function findAll() {
  const { rows } = await pool.query(
    `SELECT * FROM ${tabla} ORDER BY ${clavePrimaria} ASC`
  );
  return rows;
}

async function findById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM ${tabla} WHERE ${clavePrimaria} = $1`,
    [id]
  );
  return rows[0] || null;
}

async function create(data) {
  const columnas = camposPermitidos.filter(
    (campo) => data[campo] !== undefined
  );

  if (columnas.length === 0) {
    const error = new Error('No se recibieron campos válidos.');
    error.code = 'NO_FIELDS';
    throw error;
  }

  const valores = columnas.map((campo) => data[campo]);
  const marcadores = columnas.map((_, indice) => `$${indice + 1}`);

  const sql = `
    INSERT INTO ${tabla} (${columnas.join(', ')})
    VALUES (${marcadores.join(', ')})
    RETURNING *
  `;

  const { rows } = await pool.query(sql, valores);
  return rows[0];
}

async function update(id, data) {
  const columnas = camposPermitidos.filter(
    (campo) => data[campo] !== undefined
  );

  if (columnas.length === 0) {
    const error = new Error(
      'No se recibieron campos válidos para actualizar.'
    );
    error.code = 'NO_FIELDS';
    throw error;
  }

  const valores = columnas.map((campo) => data[campo]);
  const cambios = columnas.map(
    (columna, indice) => `${columna} = $${indice + 1}`
  );

  valores.push(id);

  const sql = `
    UPDATE ${tabla}
    SET ${cambios.join(', ')}
    WHERE ${clavePrimaria} = $${valores.length}
    RETURNING *
  `;

  const { rows } = await pool.query(sql, valores);
  return rows[0] || null;
}

async function remove(id) {
  const { rows } = await pool.query(
    `DELETE FROM ${tabla} WHERE ${clavePrimaria} = $1 RETURNING *`,
    [id]
  );
  return rows[0] || null;
}

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove,
};