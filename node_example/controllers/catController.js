'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = (req, res) => {
  console.log('nakkie')
  res.json(cats);
};

module.exports = {
  cat_list_get,
};