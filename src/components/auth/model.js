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
        i1:{type: Boolean, required: false},
        i2:{type: Boolean, required: false},
        i3:{type: Boolean, required: false},
        i4:{type: Boolean, required: false},
        i5:{type: Boolean, required: false},
        i6:{type: Boolean, required: false},
        i7:{type: Boolean, required: false},
        i8:{type: Boolean, required: false},
        i9:{type: Boolean, required: false},
        i10:{type: Boolean, required: false}
},
{
    timestamps: true
});

//Le pasamos nombre de la collección, esquema
const model = mongoose.model('User', mySchema);

module.exports = model;