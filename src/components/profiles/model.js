const mongoose = require('mongoose');
var User = mongoose.model('User')
const { Schema } = mongoose;

const profile = new Schema({
    avatar: { type: String, required: true },
    isHost: { type: Boolean, required: true },
    about: { type: String, required: false },
    user: { type: String ,ref: 'User.uid',required: true },// este user deberia ir con OBJectID pero el modulo User esta sin configuracion adecuada
    favorites: { type: String , required: false}
});

//Le pasamos nombre de la collección, esquema

module.exports = mongoose.model('Profile', profile);