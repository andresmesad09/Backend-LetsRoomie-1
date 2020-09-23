const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    user_id: {
        type: mongoose.isValidObjectId,
        required: true
    },
    profiel_id: {
        type: mongoose.isValidObjectId,
        required: true
    }
    

});

//Le pasamos nombre de la collección, esquema
const model = mongoose.model('Favorite', mySchema);

module.exports = model;