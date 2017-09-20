'use strict';

const express = require('express');
const router = express.Router();

router.get('/news', (req, res) => {
  res.render('news', {title: "Новости"});
});

module.exports = router;