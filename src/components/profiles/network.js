const express = require('express')
const router = express.Router()
const profile = require('./controller')
const auth =  require('../middleware/auth')

router.get('/profile', auth, profile.getProfiles)
router.get('/profileh', profile.getProfilesIsHost)
router.post('/profile', auth, profile.addProfile)
router.get('/profile/:id', auth, profile.getOneProfile)
router.patch('/profile/:id', auth, profile.updateProfile)
router.delete('/profile/:id', auth, profile.deleteProfile)

module.exports = router
