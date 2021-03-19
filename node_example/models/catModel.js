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
    const [rows] = await promisePool.query('SELECT * FROM wop_cat ORDER BY ${order}');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};

const insertCat = async (cat) => {
  const [row, fields] = await promisePool.execute(`INSERT INTO wop_cat (cat_id, name, age, weight, owner, filename)
  VALUES (?, ?,?, '1', 'foo.jpg')`,
      [cat.name, cat.age, cat.weight]);
    console.log('insert row', row);
    return row.insertId;
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
  insertCat,
};