// 'use strict'; module is strict by default

const express = require('express');
const router = express.Router();
const multer = require('multer');
const catController = require('../controllers/catController');
const {body} = require('express-validator');

const fileFilter = (req, file, cb) =>{
  if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/gif" || file.mimetype === "image/jpeg"){
    cb(null, true)
  } else {
    cb(null, false);
  }
}

const testFile = (req, res, next) => {
  if(req.file){
    next();
    return;
  }
  res.status(400).json({errors: 'Only .png, .jpg, .jpeg and .gif format allowed!'})

}

const upload = multer({dest: 'uploads/', fileFilter});

router.route('/')
.get(catController.cat_list_get)
.post(upload.single('filename'),
    testFile,
    catController.make_thumbnail,
    body('name').isLength({min: 1}).escape().blacklist(';'),
    body('age').isLength({min: 1}).isNumeric(),
    body('weight').isLength({min: 1}).isNumeric(),
    body('owner').isLength({min: 1}).isNumeric(),
    catController.cat_post_new_cat)
.put(catController.cat_put_update_cat2);

router.route('/:id')
.get(catController.cat_get_by_id)
.put(catController.cat_put_update_cat)
.delete(catController.cat_delete_cat);

module.exports = router;