const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
//const { ensureAuthenticated } = require('../config/auth');

//router.get('/', (req, res) => res.send('Hello'));
const staticPath = path.join(__dirname, '../../homework/src/Pages/Home');
router.get('/', (req, res) => res.render(express.static(staticPath)));
//router.get('/dashbaord', (req, res) => res.render('dashbaord'));

module.exports = router;
