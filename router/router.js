const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllerAuth = require('../controller/auth')
const controllerOrders = require('../controller/orders')


router.post('/signin', controllerAuth.signin);
router.post('/signup',  controllerAuth.signup);
router.get('/orders', passport.authenticate('jwt', {session: false}), controllerOrders.getAll);
router.get('/logout', passport.authenticate('jwt', {session: false}), controllerAuth.loginOut );


module.exports = router;
