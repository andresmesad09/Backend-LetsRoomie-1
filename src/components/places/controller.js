const Place = require('./model');
const placeController = {};
const response = require('../../network/response');

placeController.getPlaces= async (req, res, next) => {
  try {
    const places = await Place.find().populate('user');
    response.success(req, res, places, 200);
  } catch (error) {
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}

placeController.getPlacesAvailable= async (req, res, next) => {
  try {
    const places = await Place.find({available:true}).populate('user');
    response.success(req, res, places, 200);
    } catch (error) {
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}



placeController.getOnePlace = async (req, res,next) =>{
  try {
    const place = await Place.findById(req.params.id).populate('user');
    response.success(req, res, place, 200);
  } catch (error) {
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}
placeController.getOnePlaceCity = async (req, res,next) =>{
  try {
    const place = await Place.find({city:req.params.city}).populate('user');
    response.success(req, res, place, 200);
  } catch (error) {
    next(error)
  }
}


placeController.addPlace = async (req, res, next) => {
    try {
        const place = new Place({
            namePlace: req.body.namePlace,
            location: req.body.location,
            city: req.body.city,
            images: req.body.images,
            price: req.body.price,
            available: req.body.available,
            furniture: req.body.furniture,
            wifi: req.body.wifi,
            bath: req.body.bath,
            parking: req.body.parking,
            tv: req.body.tv,
            cleaning: req.body.cleaning,
            closet: req.body.closet,
            size: req.body.size,
            description: req.body.description,
            user: req.body.user,
        })
        await place.save()
        response.success(req, res, place, 201);
        
        
      } catch (error) {
        response.error(req, res, "Error creating place", 500, error.message);
      }
}

placeController.updatePlace = async(req, res, next) => {
  try {
    const place = {
      namePlace: req.body.namePlace,
      location: req.body.location,
      city: req.body.city,
      images: req.body.images,
      price: req.body.price,
      available: req.body.available,
      furniture: req.body.furniture,
      wifi: req.body.wifi,
      bath: req.body.bath,
      parking: req.body.parking,
      tv: req.body.tv,
      cleaning: req.body.cleaning,
      closet: req.body.closet,
      size: req.body.size,
      description: req.body.description,
      user: req.body.user,
      
    }
    await Place.findByIdAndUpdate(
      req.params.id,
      { $set: place },
      { omitUndefined: true, upsert: true }
    )

    const placeUpdated = await Place.findById(req.params.id).populate('user');
    response.success(req, res, placeUpdated, 200);
  } catch (error) {
    response.error(req, res, "Error updating the place", 400, error.message);
  }
}

placeController.deletePlace = async(req, res, next) => {
  try{
    await Place.findByIdAndRemove(req.params.id)
    response.success(req, res, `Place ${req.params.id} deleted`, 200);
  }catch(error){
    response.error(req, res, "Unexpected error", 500, error.message);
  }
}



module.exports = placeController