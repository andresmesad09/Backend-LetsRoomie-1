const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true }
},
{
    timestamps: true
});

//Le pasamos nombre de la collección, esquema
const model = mongoose.model('User', mySchema);

module.exports = model;