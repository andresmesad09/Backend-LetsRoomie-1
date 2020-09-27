const express = require('express')
const router = express.Router()
const place = require('./controller')
const auth =  require('../middleware/auth')

router.get('/place', place.getPlaces)
router.post('/place', auth, place.addPlace)
router.get('/place/:id', place.getOnePlace)
router.patch('/place/:id', auth, place.updatePlace)
router.delete('/place/:id', auth, place.deletePlace)
module.exports = router