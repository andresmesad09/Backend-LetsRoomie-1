const express = require("express");
const morgan = require("morgan");

const db = require('./components/db/db');

const config = require("./config");
const router = require("./network/routes");

const app = express();

db(config.dbUrl);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.get("/", (req, res) => {
  res.send("Hola");
});

app.listen(config.port, () => {
  console.log(`Server listeng at port:${config.port}`);
});
