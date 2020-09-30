const firebase = require('firebase/app');
require('firebase/auth');
const store = require('./store');
const config = require('../../config');
const userController = {};
const User = require('./model');
const response = require('../../network/response');

const fb = firebase.initializeApp({
  apiKey: config.fbApiKey,
  authDomain: config.fbAuthDomain,
  databaseURL: config.fbDbUrl,
  projectId: config.fbProjectId,
  storageBucket: config.fbStorageBuscket,
  messagingSenderId: config.fbMessaginId,
  appId: config.fbAppId,
});

userController.createUser = async (email, password) => {
  return fb.auth().createUserWithEmailAndPassword(email, password);
};

userController.authenticate = async (email, password) => {
  if (!email || !password) {
    console.error('[userController] No hay usuario o password');
    throw new Error('Los datos son incorrectos');
  } else {
    try {
      const data = await fb.auth().signInWithEmailAndPassword(email, password);
      const userId = data.user;
      const user = await store.getAuth(userId.uid);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }
};

userController.addUser = (user) => {
  return new Promise((resolve, reject) => {
    if (!user) {
      console.error('[userController] No hay usuario');
      reject('Los datos son incorrectos');
      return false;
    }

    const newUser = store.add(user);
    resolve(newUser);
  });
};

userController.getUsers = (filterUser) => {
  return new Promise((resolve, reject) => {
    resolve(store.list(filterUser));
  });
};

userController.getUsersByEmail = (filterUser) => {
  return new Promise((resolve, reject) => {
    resolve(store.listUsersByEmail(filterUser));
  });
};

userController.deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    if (!id) {
      console.log('[User controller] No id to eliminate');
      reject('Missing id');
      return false;
    }

    resolve(store.delete(id));
  });
};

userController.updateUser = (id, data) => {
  return new Promise((resolve, reject) => {
    if (!id || !data) {
      console.log('[User controller] no data to update');
      reject('No data or id to update');
    }

    resolve(store.update(id, data));
  });
};
userController.getUserIsHost = async (req, res, next) => {
  try {
    const users = await User.find({isHost: true});
    response.success(req, res, users, 200);
  } catch (error) {
    response.error(req, res, "Unexpected error getting the hosts", 500, error.message);
  }
};
module.exports = userController;
