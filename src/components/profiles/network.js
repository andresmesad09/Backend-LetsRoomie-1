const express = require('express')
const router = express.Router()
const profile = require('./controller')

router.get('/profile', profile.getProfiles)
router.post('/profile', profile.addProfile)
router.get('/profile/:id', profile.getOneProfile)
router.patch('/profile/:id',profile.updateProfile)
router.delete('/profile/:id',profile.deleteProfile)

module.exports = router
