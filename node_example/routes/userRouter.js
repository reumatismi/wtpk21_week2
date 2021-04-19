// 'use strict'; module is strict by default

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.route('/').
    get(userController.user_list_get)

router.route('/:id')
.get(userController.user_get_by_id);

module.exports = router;
