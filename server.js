'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const passport = require('./middleware/auth');

const initRouter = require('./routes/index');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.set('view engine', 'pug');
app.set('views', './views');

// app.use('/error', (req, res, next) => {
//   res.render('error');
// });
initRouter(app);

app.get('/', (req, res, next) => {
  res.render('index');
});

app.use(function(req, res, next) {
  res.status(404).render('404', {title: 'Дерьмо случается'});
});

// app.use((err, req, res, next) => {
//   if (err) {
//     res.redirect('/error');
//   }
// });

app.listen(1337, function () {
  console.log('app listen');
});

