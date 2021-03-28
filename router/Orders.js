const express = require('express');
const router = express.Router();
const passport = require('passport');
const controllerOrders = require('../controller/Orders');
const upload = require('../config/upload');

router.post('/project/create/publication', passport.authenticate('jwt', { session: false }), upload.single('image'), controllerOrders.create);
router.get('/orders', passport.authenticate('jwt', { session: false }), controllerOrders.getAll);
router.get('/orders/:id', passport.authenticate('jwt', { session: false }), controllerOrders.getById);
router.get('/myOrders', passport.authenticate('jwt', { session: false }), controllerOrders.getMyAll);
router.delete('/orders/:id', passport.authenticate('jwt', { session: false }), controllerOrders.remove);

module.exports = router;
