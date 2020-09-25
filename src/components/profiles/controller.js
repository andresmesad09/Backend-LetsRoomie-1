const Profile = require('./model');
const profileController = {};


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
   


profileController.getProfiles= async (req, res, next) => {
    try {
      const profiles = await Profile.find()//.populate('user')
      res.json({
        status: 200,
        body: profiles
      })
    } catch (error) {
      next(error)
    }
}

module.exports = profileController