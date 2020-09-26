const express = require('express')
const router = express.Router()
const favorite = require('./controller')

router.get('/fav', favorite.getFavorites)
router.post('/fav', favorite.addFavorite)
router.get('/fav/:id', favorite.getOneFavorite)
router.patch('/fav/:id',favorite.updateFavorite)
router.delete('/fav/:id',favorite.deleteFavorite)

module.exports = router
