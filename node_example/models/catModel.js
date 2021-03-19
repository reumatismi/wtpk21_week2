'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    console.log('got something back from db? ')
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const getAllCatsSort = async (order) => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_cat ORDER BY age');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

/*
const cats = [
  {
    id: '1',
    name: 'Frank',
    age: '6',
    weight: '5',
    owner: '1',
    filename: 'http://placekitten.com/400/300',
  },
  {
    id: '2',
    name: 'James',
    age: '4',
    weight: '11',
    owner: '2',
    filename: 'http://placekitten.com/400/302',
  },
];
*/
module.exports = {
  getAllCats,
  getAllCatsSort,
};