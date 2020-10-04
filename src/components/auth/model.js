const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    uid: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    isHost: { type: Boolean, required: true },
    about: { type: String, required: false },
        movietheater:{type: Boolean, required: false},
        literature:{type: Boolean, required: false},
        sports:{type: Boolean, required: false},
        parties:{type: Boolean, required: false},
        study:{type: Boolean, required: false},
        music:{type: Boolean, required: false},
        friends:{type: Boolean, required: false},
        travel:{type: Boolean, required: false},
        art:{type: Boolean, required: false},
        work:{type: Boolean, required: false}
},
{
    timestamps: true
});

//Le pasamos nombre de la collección, esquema
const model = mongoose.model('User', mySchema);

module.exports = model;