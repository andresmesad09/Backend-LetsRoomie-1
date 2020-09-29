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
      expiresIn: 1440,
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

//Get user by email
router.get('/userByEmail', function (req, res) {
  const filterUsers = req.query.email|| null;
  controller
    .getUsersByEmail(filterUsers)
    .then((usersList) => {
      response.success(req, res, usersList, 200);
    })
    .catch((e) => {
      response.error(req, res, 'Unexpected error', 500, e);
    });
});

//Send Whatsapp to a user
router.get('/contact-wapp', function(req, res) {
  const userId = req.query._id;
  controller.getUsers(userId)
    .then(user => {
      const phoneNumber = user[0].phone.replace(' ', '');
      const message = 'I´m interested in be your roomie.'
      url = `wa.me/${phoneNumber}?text=${message}`
      response.success(req, res, url, 200);
    })
    .catch(e => {
      response.error(req, res, e.message, 400, e);
    })
})

//Send Mail to a user
router.get('/contact-mail', function(req, res) {
  const userId = req.query._id;
  controller.getUsers(userId)
    .then(user => {
      const emailAdress = user[0].email;
      const subject = "Lets Rommie"
      const message = 'I´m interested in be your roomie.'
      url = `mailto:${emailAdress}?subject=${subject}&body=${message}`
      response.success(req, res, url, 200);
    })
    .catch(e => {
      response.error(req, res, e.message, 400, e);
    })
})

module.exports = router;
