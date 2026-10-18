const express = require('express');
const zonaRoutes = require('./zonaRoutes');
const centroRoutes = require('./centroRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const productoRoutes = require('./productoRoutes');

const router = express.Router();

router.use('/zonas', zonaRoutes);
router.use('/centros', centroRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/productos', productoRoutes);

module.exports = router;
