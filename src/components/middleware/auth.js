const express = require('express');
const jwt = require('jsonwebtoken');
const rutasProtegidas = express.Router();
const config = require('../../config');
const response = require('../../network/response')
rutasProtegidas.use((req, res, next) => {
  const token = req.headers['access-token'];

  if (token) {
    jwt.verify(token, config.llave, (err, decoded) => {
      if (err) {
        response.error(req, res, "Invalid token", 401, err.message);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    response.error(req, res, "Missing token", 401, "There is no token");
  }
});

module.exports = rutasProtegidas;
