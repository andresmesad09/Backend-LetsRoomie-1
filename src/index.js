const express = require("express");
const morgan = require("morgan");
const jwt = require("jsonwebtoken")

const db = require('./components/db/db');

const config = require("./config");
const router = require("./network/routes");
const cors = require('cors')

const app = express();

app.use(cors());


db(config.dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



router(app);

app.get("/", (req, res) => {
  res.send("It´s alive!!!");
});

app.listen(config.port, () => {
  console.log(`Server listeng at ${config.host}:${config.port}`);
});
