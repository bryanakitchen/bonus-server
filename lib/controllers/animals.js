const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()

  .get('/test', (req, res) => {
    res.send('Hello world!');
  })

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
  });
