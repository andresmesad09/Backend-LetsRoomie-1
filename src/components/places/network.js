const express = require('express')
const router = express.Router()
const place = require('./controller')

router.get('/place', place.getPlaces)
router.post('/place', place.addPlace)
router.get('/place/:id', place.getOnePlace)
router.patch('/place/:id',place.updatePlace)
router.delete('/place/:id',place.deletePlace)
module.exports = router