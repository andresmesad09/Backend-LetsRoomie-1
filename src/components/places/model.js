const mongoose = require('mongoose');
const { Schema } = mongoose;
var Profile = mongoose.model('Profile')

const place = new Schema({
    namePlace: { type: String, required: true },
    location: { type: String, required: true },
    images: { type: String, required: true },
    price: { type: String, required: true },
    avalaible: { type: String, required: true },
    furniture: { type: String, required: true },
    wifi: { type: String, required: true },
    bath: { type: String, required: true },
    parking: { type: String, required: true },
    tv: { type: String, required: true },
    cleaning: { type: String, required: true },
    closet: { type: String, required: true },
    size: { type: String, required: true },
    description: { type: String, required: true },
    profile: { type: Schema.ObjectId, ref: 'Profile', required: true },
});

//Le pasamos nombre de la collección, esquema

module.exports = mongoose.model('Place', place);