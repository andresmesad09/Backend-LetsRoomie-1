const express = require("express");
const app = express();
const cors = require('cors')
const router = require("./network/routes");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);


app.get("/", (req, res) => {
  res.send("It´s alive!!!");
});

module.exports = app;