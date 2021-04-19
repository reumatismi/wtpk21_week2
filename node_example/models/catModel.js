'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT wop_cat.*, wop_user.name AS ownername FROM wop_cat, wop_user WHERE wop_cat.owner = wop_user.user_id');
    return rows;
  } catch (e) {
    throw new Error('getAllCats failed')
  }
};

const getAllCatsSort = async (order) => {
  try {
    const [rows] = await promisePool.query(`SELECT * FROM wop_cat ORDER BY ${order}`);
    return rows;
  } catch (e) {
    throw new Error('getAllCatsSort failed')
  }
};

const insertCat = async (cat) => {
  try{
    const [row] = await promisePool.execute('INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?)', [cat.name, cat.age, cat.weight, cat.owner, cat.filename, cat.coords]);
    console.log('insert row', row)
    return row.insertId;
  }catch (e) {
    throw new Error('InsertCat failed')
  }

};

const updateCat = async (cat) => {
  try{
    const [row] = await promisePool.execute('UPDATE `wop_cat` SET `name`=?, `age`=?, `weight`=?, `owner`=? WHERE cat_id=?', [cat.name, cat.age, cat.weight, cat.owner, cat.id]);
    console.log('update row', row);
    return true;
  }catch (e) {
    throw new Error('updateCat failed')
  }

}

const deleteCat = async (id) => {
  try {
    const [row] = await promisePool.execute(
        'DELETE FROM `wop_cat` WHERE cat_id=?', [id]);
    console.log('delete row', row);
    return true;
  }catch (e) {
    throw new Error('deleteCat failed')
  }
}

const getCatById = async(id) =>{
  try{
    const [row] = await promisePool.query('SELECT * FROM `wop_cat` WHERE cat_id=?', [id]);
    return row;
  }catch (e) {
    throw new Error('getCatById failed')
  }

}

module.exports = {
  getAllCats,
  getAllCatsSort,
  insertCat,
  updateCat,
  deleteCat,
  getCatById,
};