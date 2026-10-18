const express = require('express');
const entities = require('../config/entities');
const createCrudRoutes = require('./crudFactory');

const router = express.Router();

router.use('/zonas', createCrudRoutes(entities.zonas));
router.use('/centros', createCrudRoutes(entities.centros));
router.use('/categorias', createCrudRoutes(entities.categorias));
router.use('/productos', createCrudRoutes(entities.productos));

module.exports = router;