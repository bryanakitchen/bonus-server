const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()

  .post('/', (req, res) => {
    Animal
      .insert(req.body)
      .then(animal => res.send(animal));
  });
