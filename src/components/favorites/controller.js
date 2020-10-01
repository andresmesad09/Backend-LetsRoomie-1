const Favorite = require('./model');
const favoriteController = {};
const response = require('../../network/response')

favoriteController.getFavorites= async (req, res, next) => {
  try {
    if (!req.query.user) {
      const favorites = await Favorite.find();
      response.success(req, res, favorites, 200);
    } else {
      const favorites = await Favorite.find({user: req.query.user}).populate('place');
      response.success(req, res, favorites, 200);
    }
  } catch (error) {
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}

favoriteController.getOneFavorite = async (req, res,next) =>{
  try {
    const favorite = await Favorite.findById(req.params.id).populate('place');
    response.success(req, res, favorite, 200);
  } catch (error) {
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}

favoriteController.getFavoritePlace= async (req, res, next) => {
  try {
    const favorites = await Favorite.find({place:req.params.city})
        res.json({
          status: 200,
          body: favorites
        }) 
    }catch (error) {
    next(error)
  }
}

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

favoriteController.updateFavorite = async(req, res, next) => {
  try {
    const favorite = {
      place: req.body.place,
      user: req.body.user
    }
    await Favorite.findByIdAndUpdate(
      req.params.id,
      { $set: favorite },
      { omitUndefined: true, upsert: true }
    )
    res.json({
      status: 200,
      message: 'Favorite updated',
      body: favorite
    })
  } catch (error) {
    next(error)
  }
}

favoriteController.deleteFavorite = async(req, res, next) => {
  try{
    await Favorite.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Favorite ${req.params.id} deleted`
    })
  }catch(error){
    next(error)
  }
}



module.exports = favoriteController