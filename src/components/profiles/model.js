const mongoose = require('mongoose');

const { Schema } = mongoose;

const profile = new Schema({
    avatar: { type: String, required: true },
    isHost: { type: Boolean, required: true },
    about: { type: String, required: false },
    user_id: { type: String, required: true },
    places: { type: Array, required: false },
    favorites: { type: String, required: false}
});

//Le pasamos nombre de la collección, esquema

module.exports = mongoose.model('Profile', profile);