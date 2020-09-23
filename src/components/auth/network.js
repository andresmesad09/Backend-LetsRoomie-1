const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require('../../network/response');
const admin = require('firebase-admin');
//const serviceAccountKey = require('../../../../serviceAccountKey.json')
const config = require('../../config');

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: config.dbUrl
});

admin.firestore();

//Create user
router.post("/createUser", async (req, res) => {
  try {
    const newAuth = await admin.auth().createUser({
      email: req.body.email,
      emailVerified: true,
      phoneNumber: req.body.phone,
      password: req.body.password,
      displayName: req.body.name,
      disabled: false,
    })

    const newUser = {
      _id: newAuth["uid"],
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
    }

    await controller.addUser(newUser);
    
    response.success(req, res, newAuth, 201);
    console.log('[create newUser]:', newAuth.email)
  } catch (e) {
    response.error(req, res, 'Error creating newUser', 401, e.message)
  }
});

//Login User
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await controller.authenticate(email, password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

//Get users
router.get('/users', function (req, res) {
  const filterUsers = req.query._id || null;
  controller.getUsers(filterUsers)
      .then((usersList) => {
          response.success(req, res, usersList, 200);
      })
      .catch(e => {
          response.error(req, res, 'Unexpected error', 500, e);
      })
})

module.exports = router;
