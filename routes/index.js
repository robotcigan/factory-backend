'use strict';

const fs = require('fs'),
      path = require('path'),
      express = require('express'),
      router = express.Router();

function initRoutes(pathTo, prefix) {
  fs
    .readdirSync(pathTo)
    .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
    .forEach(file => {
      if (file.indexOf('.js') === -1) {
        initRoutes(path.join(pathTo, file), (prefix ? prefix + '/' : '') + file);
      } else {
        let fileName = file.substring(0, file.length - 3)
          , routePath = fileName.split('-')
          , routerFile = require(path.join(pathTo, file));

        console.log('Router will use for URL: "/' + prefix + '/' + ((routePath[1] || '').split('.')[0] || '') + '"', ' FILE: "' + file + '"');
        router.use('/' + (prefix ? prefix + '/' : '') + ((routePath[1] || '').split('.')[0] || ''), routerFile);
      }
    });
}

module.exports = (app) => {
  initRoutes(__dirname);
  app.use('', router);
};