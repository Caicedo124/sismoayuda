const express = require('express');
const createCrudController = require('../controllers/crudFactory');

function createCrudRoutes(entity) {
  const router = express.Router();
  const controller = createCrudController(entity);

  router.get('/', controller.getAll);
  router.get('/:id', controller.getById);
  router.post('/', controller.create);
  router.put('/:id', controller.update);
  router.delete('/:id', controller.remove);

  return router;
}

module.exports = createCrudRoutes;