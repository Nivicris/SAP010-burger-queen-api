const express = require('express');

const router = express.Router();
const authController = require('../controller/auth');

module.exports = (app, nextMain) => {
  router.post('/auth', authController.postAuth);
  app.use(router);

  return nextMain();
};
