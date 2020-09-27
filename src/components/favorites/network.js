const express = require('express')
const router = express.Router()
const favorite = require('./controller')
const auth =  require('../middleware/auth')

router.get('/fav', auth, favorite.getFavorites)
router.post('/fav', auth, favorite.addFavorite)
router.get('/fav/:id', auth, favorite.getOneFavorite)
router.patch('/fav/:id', auth, favorite.updateFavorite)
router.delete('/fav/:id', auth, favorite.deleteFavorite)

module.exports = router
