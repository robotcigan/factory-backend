'use strict';

const express = require('express');
const router = express.Router();

const passport = require('../../middleware/auth');

router.get('/login', function (req, res) {
  res.render('login');
});

router.post('/login',
  passport.authenticate('local'),
  (req, res) => {
    res.send('fgasfd');
  });

module.exports = router;

