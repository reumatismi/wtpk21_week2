// 'use strict'; module is strict by default

const express = require('express');
const router = express.Router();
const catController = require('../controllers/catController');

router.route('/') // grouping routers
  .get(catController.cat_list_get)
  .post(catController.cat_post_new_cat);

router.route('/:id')
  .get(catController.cat_get_by_id)
.put((req, res) => {
  console.log('put cat', req.params); //update
  res.send('put cat ' + req.params.id);
})
.delete((req, res) => {
  console.log('delete cat', req.params);
  res.send('delete cat');
});

module.exports = router; // export the functionality of the module

