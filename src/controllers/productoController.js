const productoModel = require('../models/productoModel');

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
    const productos = await productoModel.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    return responderError(res, error);
  }
}

async function getById(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const producto = await productoModel.findById(Number(req.params.id));

    if (!producto) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return responderError(res, error);
  }
}

async function create(req, res) {
  try {
    const producto = await productoModel.create(req.body ?? {});
    return res.status(201).json(producto);
  } catch (error) {
    return responderError(res, error);
  }
}

async function update(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const producto = await productoModel.update(
      Number(req.params.id),
      req.body ?? {}
    );

    if (!producto) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json(producto);
  } catch (error) {
    return responderError(res, error);
  }
}

async function remove(req, res) {
  if (!idValido(req.params.id)) {
    return res.status(400).json({ error: 'Invalid id.' });
  }

  try {
    const producto = await productoModel.remove(Number(req.params.id));

    if (!producto) {
      return res.status(404).json({ error: 'Record not found.' });
    }

    return res.status(200).json({
      message: 'Record deleted.',
      record: producto,
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