const express = require("express");
const router = express.Router();
const controller = require("./controller");
const response = require('../../network/response');

//Create user
router.post("/createUser", async (req, res) => {
  try {
    const newAuth = await controller.createUser(req.body.email, req.body.password);

    const newUser = {
      _id: newAuth.user.uid,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
    }

    const user = await controller.addUser(newUser);
    
    response.success(req, res, user, 201);
    console.log('[create newUser]:', user.email)
  } catch (e) {
    response.error(req, res, 'Error creating newUser', 401, e.message)
  }
});

//Login User
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await controller.authenticate(email, password);
    response.success(req, res, user, 200)
  } catch (err) {
    response.error(req, res, "Auth Error", 500, err.message);
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

// Get current user
router.get('/current-user', function (req, res) {
  const userId = req.body._id || null;
  controller.getUsers(userId)
      .then(user => {
          response.success(req, res, user, 200)
      })
      .catch(error => response.error(req, res, "Error getting the current user", 500, error))
})

module.exports = router;
