'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  console.log('nakkie', req.query)
  if (req.query.sort === 'age') {
    //const catsSort = cats.slice().sort((catA, catB) => catA.age - catB.age);
    res.json({ todo: 'will do later'});
    return;
  }
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get_by_id = (req, res) => {
  console.log('get one cat by id', req.params);

  res.json(cats.filter(cat => cat.id === req.params.id));
};

module.exports = {
  cat_list_get,
  cat_get_by_id,
};