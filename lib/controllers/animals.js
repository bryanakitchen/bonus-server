const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()

  .post('/', (req, res, next) => {
    Animal
      .insert(req.body)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Animal
      .find()
      .then(animals => res.send(animals))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Animal
      .findById(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Animal
      .delete(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  })

  .put('/:id', (req, res, next) => {
    Animal
      .put(req.params.id)
      .then(animal => res.send(animal))
      .catch(next);
  });
