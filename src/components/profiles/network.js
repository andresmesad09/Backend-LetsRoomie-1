const express = require('express')
const router = express.Router()
const profile = require('./controller')

router.get('/profile', profile.getProfiles)
router.post('/profile', profile.addProfile)

module.exports = router
