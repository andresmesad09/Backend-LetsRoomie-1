const mongoose = require('mongoose');
const Place = require('../places/model');
const User = require('../auth/model')
const Schema = mongoose.Schema;

const mySchema = new Schema({
  
    place:  { type: Schema.ObjectId ,ref: 'Place',required: true },
    user: { type: Schema.ObjectId ,ref: 'User',required: true }
    
},
{
    timestamps: true
});

//Le pasamos nombre de la collección, esquema
const model = mongoose.model('Favorite', mySchema);

module.exports = model;