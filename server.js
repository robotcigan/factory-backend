'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const initRouter = require('./routes/index');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

initRouter(app);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use(function(req, res, next) {
  res.status(404).render('404', {title: 'Дерьмо случается'});
});

app.listen(1337, function () {
  console.log('app listen');
});

