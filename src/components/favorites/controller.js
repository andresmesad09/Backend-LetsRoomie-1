const Favorite = require('./model');
const favoriteController = {};


favoriteController.addFavorite = async (req, res, next) => {
    try {
        const favorite = new Favorite({
          place: req.body.place,
          user: req.body.user,
        })
        await favorite.save()
        res.json({
          status: 201,
          body: favorite
        })
      } catch (error) {
        next(error)
      }
}
   


favoriteController.getFavorites= async (req, res, next) => {
    try {
      const favorites = await Favorite.find()//.populate('user')
      res.json({
        status: 200,
        body: favorites
      })
    } catch (error) {
      next(error)
    }
}

module.exports = favoriteController