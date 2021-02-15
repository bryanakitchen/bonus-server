const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animal');

describe('bonus-server routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Adds an animal via POST', async() => {
    return request(app)
      .post('/api/v1/animals')
      .send({
        name: 'Lion',
        type: 'mammal',
        characteristic: 'big mane'
      })
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'Lion',
          type: 'mammal',
          characteristic: 'big mane'
        });
      });
  });

  it('Gets all animals via GET', async() => {
    const animals = await Promise.all([
      { name: 'lion', type: 'mammal', characteristic: 'mane' },
      { name: 'tiger', type: 'mammal', characteristic: 'stripes' },
      { name: 'bear', type: 'mammal', characteristic: 'hibernates' }
    ].map(animal => Animal.insert(animal)));
    
    return request(app)
      .get('/api/v1/animals')
      .then(res => {
        animals.forEach(animal => {
          expect(res.body).toContainEqual(animal);
        });
      });
  });

  it('Gets an animal by Id via GET', async() => {
    const animal = await Animal.insert({ name: 'robin', type: 'bird', characteristic: 'feathers and beaks' });
    
    return request(app)
      .get(`/api/v1/animals/${animal.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'robin',
          type: 'bird',
          characteristic: 'feathers and beaks'
        });
      });
  });

  it('Deletes an animal by Id via DELETE', async() => {
    const animal = await Animal.insert({ name: 'turtle', type: 'reptile', characteristic: 'protective shell' });
    
    return request(app)
      .delete(`/api/v1/animals/${animal.id}`)
      .then(res => {
        expect(res.body).toEqual({
          id: expect.any(String),
          name: 'turtle',
          type: 'reptile',
          characteristic: 'protective shell'
        });
      });
  });


});
