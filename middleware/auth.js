'use strict';

const passport = require('passport');
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy((username, password, cb) => {
  if (username == '1' && password == '1' ) {
    return cb(null, username);
  } else {
    cb('user not found');
  }
}));

passport.serializeUser((username, cb) => {
  cb(null, username);
});

passport.deserializeUser((username, cb) => {
  cb(null, { username });
});

module.exports = passport;