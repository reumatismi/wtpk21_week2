'use strict';

const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('error', e.message);
  }
};'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel:', e.message);
  }
};

const insertUser = async (req) => {
  try {
    const [rows] = await promisePool.execute(
        'INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?);',
        [req.name, req.username, req.password]);
    console.log('userModel insert:', rows);
    return rows.insertId;
  } catch (e) {
    console.error('userModel insertUser:', e);
    return 0;
  }
};

const updateUser = async (id, req) => {
  try {
    const [rows] = await promisePool.execute(
        'UPDATE wop_user SET name = ?, email = ?, password = ? WHERE user_id = ?;',
        [req.body.name, req.body.username, req.body.passwd, id]);
    console.log('userModel update:', rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

//TODO: delete function. Consider no return needed? just best effort...

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  getUserLogin,
};


const insertUser = async (req) => {
  const [row] = await promisePool.execute('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?)', [req.name, req.username, req.password]);
  console.log('insert row', row)
  return row.insertId;
};

const getUserById = async(id) =>{
  try{
    const [row] = await promisePool.query('SELECT * FROM `wop_user` WHERE user_id=?', [id]);
    return row;
  }catch (e) {
    console.error('error', e.message);
  }
}

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

module.exports = {
  getAllUsers,
  insertUser,
  getUserById,
  getUserLogin,
};