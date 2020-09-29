const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const jwt = require('jsonwebtoken');

const config = require('../../config');

//Create user
router.post('/createUser', async (req, res) => {
  try {
    const newAuth = await controller.createUser(
      req.body.email,
      req.body.password
    );

    const newUser = {
      uid: newAuth.user.uid,
      email: req.body.email,
      phone: req.body.phone,
      name: req.body.name,
    };

    const user = await controller.addUser(newUser);

    response.success(req, res, user, 201);
    console.log('[create newUser]:', user.email);
  } catch (e) {
    response.error(req, res, 'Error creating newUser', 400, e.message);
  }
});

//Login User
router.post('/signin', async (req, res) => {
  const {email, password} = req.body;
  try {
    const user = await controller.authenticate(email, password);
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, config.llave, {
      expiresIn: 10000,
    });
    res.json({
      status: 200,
      body: user,
      token: token,
    });
  } catch (err) {
    response.error(req, res, 'Auth Error', 500, err.message);
  }
});

router.post('/signout', async (req,res) =>{
  console.log('entre aca')
  controller.logout
  res.json('Logout')
})

//Get users
router.get('/users', function (req, res) {
  const filterUsers = req.query._id || null;
  controller
    .getUsers(filterUsers)
    .then((usersList) => {
      response.success(req, res, usersList, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Unexpected error', 500, e);
    });
});

// Get current user
router.get('/current-user', function (req, res) {
  const userId = req.body._id || null;
  controller
    .getUsers(userId)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch((error) =>
      response.error(req, res, 'Error getting the current user', 500, error)
    );
});

// Delete a user
router.delete('/:id', function (req, res) {
  const userId = req.params.id;
  controller
    .deleteUser(userId)
    .then((data) => {
      if (!data) {
        response.error(
          req,
          res,
          "User doesn't exist",
          403,
          "User id doesn't exist in MongoDB"
        );
      } else {
        response.success(req, res, {status: 'eliminated', data: data}, 200);
      }
    })
    .catch((e) => {
      response.error(req, res, 'Error deleting that user', 500, e);
    });
});

//update a user
router.put('/:id', function (req, res) {
  const userId = req.params.id;
  controller
    .updateUser(userId, req.body)
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Error updating user', 500, e.message);
    });
});

module.exports = router;
