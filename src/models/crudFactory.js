const pool = require('../config/database');

function createCrudModel(entity) {
  const { table, primaryKey, fields } = entity;

  async function findAll() {
    const { rows } = await pool.query(
      `SELECT * FROM ${table} ORDER BY ${primaryKey} ASC`
    );
    return rows;
  }

  async function findById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM ${table} WHERE ${primaryKey} = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async function create(data) {
    const columns = fields.filter((field) => data[field] !== undefined);

    if (columns.length === 0) {
      const error = new Error('No se recibieron campos válidos.');
      error.code = 'NO_FIELDS';
      throw error;
    }

    const values = columns.map((field) => data[field]);
    const placeholders = columns.map((_, index) => `$${index + 1}`);

    const sql = `
      INSERT INTO ${table} (${columns.join(', ')})
      VALUES (${placeholders.join(', ')})
      RETURNING *
    `;

    const { rows } = await pool.query(sql, values);
    return rows[0];
  }

  async function update(id, data) {
    const columns = fields.filter((field) => data[field] !== undefined);

    if (columns.length === 0) {
      const error = new Error('No se recibieron campos válidos para actualizar.');
      error.code = 'NO_FIELDS';
      throw error;
    }

    const values = columns.map((field) => data[field]);
    const assignments = columns.map(
      (column, index) => `${column} = $${index + 1}`
    );

    values.push(id);

    const sql = `
      UPDATE ${table}
      SET ${assignments.join(', ')}
      WHERE ${primaryKey} = $${values.length}
      RETURNING *
    `;

    const { rows } = await pool.query(sql, values);
    return rows[0] || null;
  }

  async function remove(id) {
    const { rows } = await pool.query(
      `DELETE FROM ${table} WHERE ${primaryKey} = $1 RETURNING *`,
      [id]
    );
    return rows[0] || null;
  }

  return { findAll, findById, create, update, remove };
}

module.exports = createCrudModel;