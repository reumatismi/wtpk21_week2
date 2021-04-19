'use strict';
const catModel = require('../models/catModel');
const {makeThumbnail} = require('../utils/resize');
const {getCoordinates} = require('../utils/imageMeta')
const {validationResult} = require('express-validator');

const cat_list_get = async (req, res) => {
  try {
    console.log('get all cats from controllers', req.query);
    if (req.query.sort === 'age') {
      const catsSort = await catModel.getAllCatsSort('age');
      res.json(catsSort);
      return;
    } else if (req.query.sort === 'name') {
      const catsSort = await catModel.getAllCatsSort('name');
      res.json(catsSort);
      return;
    }

    const cats = await catModel.getAllCats();
    res.json(cats);
  }catch (e) {
    res.status(400).json({error: e.message})
  }

};

const cat_get_by_id = async (req, res) => {
  try {
    console.log('get cat by id', req.params.id);
    const [cat] = await catModel.getCatById(req.params.id);
    res.json(cat);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};

const cat_post_new_cat = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try{
    const coords = await getCoordinates(req.file.path);

    console.log('post cat', req.body, req.file);
    const cat = req.body;
    cat.filename = req.file.filename;
    cat.coords = coords
    const catId = await catModel.insertCat(cat);
    cat.id = catId
    res.json(cat);
  }catch (e) {
    res.status(400).json({error: e.message})
  }

};

const cat_put_update_cat = async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    console.log('put cat', req.body);
    const cat = req.body;
    cat.id = req.params.id;
    const success = await catModel.updateCat(cat);
    res.send(`cat updated ${success}`);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};

const cat_put_update_cat2 = async (req, res) => {
  try {
    console.log('update cat using html form', req.body);
    const cat = req.body;
    const success = await catModel.updateCat(cat);
    res.send(`cat updated ${success}`);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};


const cat_delete_cat = async (req, res) => {
  try {
    console.log('delete cat', req.params.id);
    const success = await catModel.deleteCat(req.params.id);
    res.send(`cat deleted ${success}`);
  }catch (e) {
    res.status(400).json({error: e.message})
  }
};

const make_thumbnail = async(req,res,next) => {
  try{
    const thumbnail = await makeThumbnail(req.file.path, req.file.filename)
    if(thumbnail) {
      next();
    }
  } catch (e) {
    console.log(e)
    res.status(400).json({error: 'Thumbnail not working. Error: ' + e.message})
  }

}

module.exports = {
  cat_list_get,
  cat_get_by_id,
  cat_post_new_cat,
  cat_put_update_cat,
  cat_put_update_cat2,
  cat_delete_cat,
  make_thumbnail,
};
