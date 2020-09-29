const express = require('express')
const router = express.Router()
const place = require('./controller')
const auth =  require('../middleware/auth')

router.get('/place', place.getPlaces)
router.get('/placea', place.getPlacesAvalaible)
router.post('/place', auth, place.addPlace)
router.get('/place/:id', place.getOnePlace)
router.get('/placec/:city', place.getOnePlaceCity)
router.patch('/place/:id', auth, place.updatePlace)
router.delete('/place/:id', auth, place.deletePlace)
module.exports = router