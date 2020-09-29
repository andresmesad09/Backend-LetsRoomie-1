const Profile = require('./model');
const profileController = {};
const response = require('../../network/response');

profileController.getProfiles = async (req, res, next) => {
  try {
    const profiles = await Profile.find();
    response.success(req, res, profiles, 200);
  } catch (error) {
    next(error);
  }
};

profileController.getOneProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById(req.params.id);
    response.success(req, res, profile, 200);
  } catch (error) {
    next(error);
  }
};

profileController.addProfile = async (req, res, next) => {
  try {
    console.log(req.body);
    const profile = new Profile({
      avatar: req.body.avatar,
      isHost: req.body.isHost,
      about: req.body.about,
      user: req.body.user,
    });
    await profile.save();
    response.success(req, res, profile, 201);
  } catch (error) {
    next(error);
  }
};

profileController.updateProfile = async (req, res, next) => {
  try {
    const profile = {
      avatar: req.body.avatar,
      isHost: req.body.isHost,
      about: req.body.about,
      user: req.body.user,
    };
    await Profile.findByIdAndUpdate(
      req.params.id,
      {$set: profile},
      {omitUndefined: true, upsert: true}
    );
    res.json({
      status: 200,
      message: 'Profile updated',
      body: profile,
    });
  } catch (error) {
    next(error);
  }
};

profileController.deleteProfile = async (req, res, next) => {
  try {
    const data = await Profile.findByIdAndRemove(req.params.id);
    // res.json({
    //   status: 200,
    //   message: `Profile ${req.params.id} deleted`,
    // });
    response.success(req, res, data, 200);
  } catch (error) {
    next(error);
  }
};

module.exports = profileController;
