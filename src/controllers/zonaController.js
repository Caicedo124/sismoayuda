const zonaModel = require('../models/zonaModel');

function idValido(id) {
  const numero = Number(id);
  return Number.isInteger(numero) && numero > 0;
}

function responderError(res, error) {
  if (error.code === 'NO_FIELDS') {
    return res.status(400).json({ error: error.message });
  }

  if (error.code === '23505') {
    return res.status(409).json({
      error: 'That record already exists.',
    });
  }

  if (['23502', '23503', '23514', '22P02'].includes(error.code)) {
    return res.status(400).json({
      error: 'Invalid or missing fields.',
    });
  }

  return res.status(500).json({
    error: 'Internal server error.',
  });
}

async function getAll(req, res) {
  try {
    const zonas = await zonaModel.findAll();
    return res.status(200).json(zonas);
  } catch (error) {
    return responderError(res, error);
  }
}

async function getById(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const zona = await zonaModel.findById(Number(req.params.id));

    if (!zona) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json(zona);
  } catch (error) {
    return responderError(res, error);
  }
}

async function create(req, res) {
  try {
    const datos = req.body ?? {};
    const zona = await zonaModel.create(datos);
    return res.status(201).json(zona);
  } catch (error) {
    return responderError(res, error);
  }
}

async function update(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const datos = req.body ?? {};
    const zona = await zonaModel.update(Number(req.params.id), datos);

    if (!zona) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json(zona);
  } catch (error) {
    return responderError(res, error);
  }
}

async function remove(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const zona = await zonaModel.remove(Number(req.params.id));

    if (!zona) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json({
      message: 'Record deleted.',
      record: zona,
    });
  } catch (error) {
    return responderError(res, error);
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};