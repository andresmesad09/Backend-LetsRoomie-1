const Place = require('./model');
const placeController = {};

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

placeController.getPlacesAvalaible= async (req, res, next) => {
  try {
    const places = await Place.find({avalaible:true}).populate('profile')
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
    const place = await Place.findById(req.params.id)
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
    res.json({
      status:200,
      body:place
    })
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
            profile: req.body.profile,
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
      profile: req.body.profile,
      
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