const express = require("express");
const morgan = require("morgan");

const config = require("./config");
const router = require("./network/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

router(app);

app.get("/", (req, res) => {
  res.send("Hola");
});

app.listen(config.port, () => {
  console.log(`Server listeng at ${config.host}:${config.port}`);
});
