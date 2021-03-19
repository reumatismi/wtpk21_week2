// 'use strict'; module is strict by default

const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.route('/') // grouping routers
  .get(catController.cat_list_get)
  .post((req, res) => {
  console.log('post cat'); //insert
  res.send('post');
});

router.route('/:id')
  .get((req, res) => {
  console.log('get one cat by id', req.params);
  res.send('Hello Cat with id' + req.params.id);
})
.put((req, res) => {
  console.log('put cat', req.params); //update
  res.send('put cat ' + req.params.id);
})
.delete((req, res) => {
  console.log('delete cat', req.params);
  res.send('delete cat');
});

module.exports = router; // export the functionality of the module

