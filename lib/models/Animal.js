const pool = require('../utils/pool');

module.exports = class Animal {
    id;
    name;
    type;
    characteristic;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.type = row.type;
      this.characteristic = row.characteristic;
    }

    static async insert(animal) {
      const { rows } = await pool.query(
        'INSERT INTO animals (name, type, characteristic) VALUES ($1, $2, $3) RETURNING *',
        [animal.name, animal.type, animal.characteristic]
      );

      if(!rows[0]) throw new Error('Could not add animal.');

      return new Animal(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM animals',
      );

      if(!rows[0]) throw new Error('No animals in database.');

      return rows.map(row => new Animal(row));
    }
    
};
