const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const path = require('path');
const controllerAuth = require('../controller/auth')
const controllerOrders = require('../controller/orders')
const Users = require('../User').Users;
const { jwt } = require('../config/keys');
const staticPath = path.resolve('public');


router.post('/signin', controllerAuth.signin);
router.post('/signup',  controllerAuth.signup);
router.get('/orders', passport.authenticate('jwt', {session: false}), controllerOrders.getAll);
router.get('/logout', passport.authenticate('jwt', {session: false}), controllerAuth.loginOut );


module.exports = router;
