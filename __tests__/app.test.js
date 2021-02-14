const fs = require('fs');
const pool = require('../lib/utils/pool');
const request = require('supertest');
const app = require('../lib/app');

describe('bonus-server routes', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });

  it('Adds an animal via POST', async() => {
    const animal = await animal.insert({
      name: 'Lion',
      type: 'mammal',
      characteristic: 'big mane'
    });

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
});
