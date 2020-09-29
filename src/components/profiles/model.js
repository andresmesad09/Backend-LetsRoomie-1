const mongoose = require('mongoose');
var User = mongoose.model('User')
const { Schema } = mongoose;

const profile = new Schema({
    avatar: { type: String, required: true },
    isHost: { type: Boolean, required: true },
    about: { type: String, required: false },
    user: { type: Schema.ObjectId ,ref: 'User',required: true },
},
{
    timestamps: true
});

//Le pasamos nombre de la collección, esquema

module.exports = mongoose.model('Profile', profile);