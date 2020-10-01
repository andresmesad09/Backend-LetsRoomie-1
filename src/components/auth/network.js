const express = require('express');
const router = express.Router();
const controller = require('./controller');
const response = require('../../network/response');
const jwt = require('jsonwebtoken');

const config = require('../../config');

router.get('/ishost', controller.getUserIsHost)
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
      avatar: req.body.avatar,
      isHost: req.body.isHost,
      about: req.body.about,
      i1:req.body.i1,
      i2:req.body.i2,
      i3:req.body.i3,
      i4:req.body.i4,
      i5:req.body.i5,
      i6:req.body.i6,
      i7:req.body.i7,
      i8:req.body.i8,
      i9:req.body.i9,
      i10:req.body.i10,
    };

    const user = await controller.addUser(newUser);

    response.success(req, res, user, 201);
    console.log('[create newUser]:', user.email);
  } catch (e) {
    response.error(req, res, e.message, 400, e.message);
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
    const data = {
      user,
      token
    }
    response.success(req, res, data, 200);
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


// Delete a user
router.delete('/users/:id', function (req, res) {
  const userId = req.params.id;
  controller
    .deleteUser(userId)
    .then((data) => {
      if (!data) {
        response.error(
          req,
          res,
          "User doesn't exist",
          400,
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
router.put('/users/:id', function (req, res) {
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
