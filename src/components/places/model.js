const mongoose = require('mongoose');
const { Schema } = mongoose;
var User = mongoose.model('User')

const place = new Schema({
    namePlace: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    images: { type: Array, required: false },
    price: { type: Number, required: true },
    avalaible: { type: Boolean, required: true },
    furniture: { type: Array, required: true },
    wifi: { type: Boolean, required: true },
    bath: { type: Boolean, required: true },
    parking: { type: Boolean, required: true },
    tv: { type: Boolean, required: true },
    cleaning: { type: Boolean, required: true },
    closet: { type: Boolean, required: true },
    size: { type: Number, required: true },
    description: { type: String, required: true },
    user: { type: Schema.ObjectId, ref: 'User', required: true },
},
{
    timestamps: true
});
//Le pasamos nombre de la collección, esquema

module.exports = mongoose.model('Place', place);