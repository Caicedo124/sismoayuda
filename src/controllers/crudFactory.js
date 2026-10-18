const createCrudModel = require('../models/crudFactory');

function createCrudController(entity) {
  const model = createCrudModel(entity);

  function sendError(res, error) {
    console.error(error);

    if (error.code === 'NO_FIELDS') {
      return res.status(400).json({ error: error.message });
    }

    if (error.code === '23505') {
      return res.status(409).json({ error: 'That record already exists.' });
    }

    if (['23502', '23503', '23514', '22P02'].includes(error.code)) {
      return res.status(400).json({
        error: 'The data does not meet the database rules.',
      });
    }

    return res.status(500).json({ error: 'Internal server error.' });
  }

  function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
  }

  async function getAll(req, res) {
    try {
      const rows = await model.findAll();
      return res.json(rows);
    } catch (error) {
      return sendError(res, error);
    }
  }

  async function getById(req, res) {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ error: 'ID must be a positive integer.' });
    }

    try {
      const row = await model.findById(id);

      if (!row) {
        return res.status(404).json({ error: 'Record not found.' });
      }

      return res.json(row);
    } catch (error) {
      return sendError(res, error);
    }
  }

  async function create(req, res) {
    try {
      const row = await model.create(req.body || {});
      return res.status(201).json(row);
    } catch (error) {
      return sendError(res, error);
    }
  }

  async function update(req, res) {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ error: 'ID must be a positive integer.' });
    }

    try {
      const row = await model.update(id, req.body || {});

      if (!row) {
        return res.status(404).json({ error: 'Record not found.' });
      }

      return res.json(row);
    } catch (error) {
      return sendError(res, error);
    }
  }

  async function remove(req, res) {
    const id = parseId(req.params.id);

    if (!id) {
      return res.status(400).json({ error: 'ID must be a positive integer.' });
    }

    try {
      const row = await model.remove(id);

      if (!row) {
        return res.status(404).json({ error: 'Record not found.' });
      }

      return res.json({ message: 'Record deleted.', record: row });
    } catch (error) {
      return sendError(res, error);
    }
  }

  return { getAll, getById, create, update, remove };
}

module.exports = createCrudController;