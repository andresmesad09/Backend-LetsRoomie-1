const Place = require('./model');
const placeController = {};
const response = require('../../network/response');

placeController.getPlaces= async (req, res, next) => {
  try {
    const places = await Place.find()//.populate('user')
    response.success(req, res, places, 200);
  } catch (error) {
    next(error)
  }
}

placeController.getPlacesAvalaible= async (req, res, next) => {
  try {
    const places = await Place.find({avalaible:true}).populate('user')
        res.json({
          status: 200,
          body: places
        }) 
    }catch (error) {
    next(error)
  }
}



placeController.getOnePlace = async (req, res,next) =>{
  try {
    const place = await Place.findById(req.params.id).populate('user')
    res.json({
      status:200,
      body:place
    })
  } catch (error) {
    next(error)
  }
}
placeController.getOnePlaceCity = async (req, res,next) =>{
  try {
    const place = await Place.find({city:req.params.city})
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
            avalaible: req.body.avalaible,
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
        res.json({
          status: 201,
          body: place
        })
        
        
      } catch (error) {
        next(error)
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
      avalaible: req.body.avalaible,
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
    res.json({
      status: 200,
      message: 'Place updated',
      body: place
    })
  } catch (error) {
    next(error)
  }
}

placeController.deletePlace = async(req, res, next) => {
  try{
    await Place.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Place ${req.params.id} deleted`
    })
  }catch(error){
    next(error)
  }
}



module.exports = placeController