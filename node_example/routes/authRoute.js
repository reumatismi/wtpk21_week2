'use strict';
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const {body} = require('express-validator');

router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/register',
    body('name').isLength({min: 3}).escape().blacklist(';'),
    body('username').isEmail(),
    body('password').isStrongPassword({minLength: 8, minUppercase: 1}),
    userController.user_post_new_user,
    authController.login);

module.exports = router;