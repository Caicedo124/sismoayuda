const express = require('express');
const centroController = require('../controllers/centroController');

const router = express.Router();

router.get('/', centroController.getAll);
router.get('/:id', centroController.getById);
router.post('/', centroController.create);
router.put('/:id', centroController.update);
router.delete('/:id', centroController.remove);

module.exports = router;