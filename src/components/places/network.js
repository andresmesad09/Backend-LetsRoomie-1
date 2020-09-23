const express = require('express')
const router = express.Router()
const place = require('./controller')

router.get('/place', place.getPlaces)
router.post('/place', place.addPlace)

module.exports = router