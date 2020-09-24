const db = require("mongoose");

db.Promise = global.Promise;

async function connect(url) {
  await db.connect(url, {
    useNewUrlParser: true, //compatibilidad
    useUnifiedTopology: true,
    useFindAndModify: false // To solve deprecation warning
  });
  console.log("[db] Conectada con éxito");
}

module.exports = connect;
