const Place = require('./model');
const placeController = {};


placeController.addPlace = async (req, res, next) => {
    try {
        const place = new Place({
            namePlace: req.body.namePlace,
            location: req.body.location,
            images: req.body.images,
            price: req.body.price,
            avalaible: req.body.avalaible,
            furniture: req.body.furniture,
            wifi: req.body.wifi,
            bath: req.body.bath,
            parking: req.body.parking,
            tv: req.body.tv,
            cleaning: req.body.cleaning,
            closet: req.body.closet,
            size: req.body.size,
            description: req.body.decription,
            profile_id: req.body.profile_id,
        })
        await place.save()
        res.json({
          status: 201,
          body: place
        })
      } catch (error) {
        next(error)
      }
}
placeController.getPlaces= async (req, res, next) => {
    try {
      const places = await Place.find()//.populate('user')
      res.json({
        status: 200,
        body: places
      })
    } catch (error) {
      next(error)
    }
}

module.exports = placeController