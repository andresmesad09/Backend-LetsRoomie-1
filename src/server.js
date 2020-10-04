const morgan = require("morgan");
const jwt = require("jsonwebtoken")

const config = require("./config");
const db = require('./components/db/db');
const app = require('./app')

db(config.dbUrl);

app.listen(config.port, () => {
    console.log(`Server listeng at ${config.host}:${config.port}`);
  });

module.exports = app;