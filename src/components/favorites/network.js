const express = require('express')
const router = express.Router()
const favorite = require('./controller')

router.get('/fav', favorite.getFavorites)
router.post('/fav', favorite.addFavorite)

module.exports = router
