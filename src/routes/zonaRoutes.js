const express = require('express');
const zonaController = require('../controllers/zonaController');

const router = express.Router();

router.get('/', zonaController.getAll);
router.get('/:id', zonaController.getById);
router.post('/', zonaController.create);
router.put('/:id', zonaController.update);
router.delete('/:id', zonaController.remove);

module.exports = router;