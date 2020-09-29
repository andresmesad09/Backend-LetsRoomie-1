const Profile = require('./model');
const profileController = {};

profileController.getProfiles= async (req, res, next) => {
  try {
    const profiles = await Profile.find().populate('user')
    res.json({
      status: 200,
      body: profiles
    })
  } catch (error) {
    next(error)
  }
}

profileController.getOneProfile = async (req, res,next) =>{
  try {
    const profile = await Profile.findById(req.params.id).populate('user')
    res.json({
      status:200,
      body:profile
    })
  } catch (error) {
    next(error)
  }
}


profileController.addProfile = async (req, res, next) => {
    try {
        const profile = new Profile({
          avatar: req.body.avatar,
          isHost: req.body.isHost,
          about: req.body.about,
          user: req.body.user,
        })
        await profile.save()
        res.json({
          status: 201,
          body: profile
        })
      } catch (error) {
        next(error)
      }
}
   

profileController.updateProfile = async(req, res, next) => {
  try {
    const profile = {
      avatar: req.body.avatar,
      isHost: req.body.isHost,
      about: req.body.about,
      user: req.body.user,
    }
    await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: profile },
      { omitUndefined: true, upsert: true }
    )
    res.json({
      status: 200,
      message: 'Profile updated',
      body: profile
    })
  } catch (error) {
    next(error)
  }
}

profileController.deleteProfile = async(req, res, next) => {
  try{
    await Profile.findByIdAndRemove(req.params.id)
    res.json({
      status: 200,
      message: `Profile ${req.params.id} deleted`
    })
  }catch(error){
    next(error)
  }
}




module.exports = profileController