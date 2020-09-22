const firebase = require("firebase/app");
require("firebase/auth");
const store = require('./store');
const config = require('../../config');

const fb = firebase.initializeApp({
    apiKey: config.fbApiKey,
    authDomain: config.fbAuthDomain,
    databaseURL: config.fbDbUrl,
    projectId: config.fbProjectId,
    storageBucket: config.fbStorageBuscket,
    messagingSenderId: config.fbMessaginId,
    appId: config.fbAppId
})

function createUser(email, password) {
    fb.auth().createUserWithEmailAndPassword(email, password);
}

function authenticate(email, password) {
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            console.error('[userController] No hay usuario o password');
            reject('Los datos son incorrectos');
            return false;
        }
        const data = fb.auth().signInWithEmailAndPassword(email, password);
        resolve(data);
    })
    
}


function addUser(user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            console.error('[userController] No hay usuario');
            reject('Los datos son incorrectos');
            return false;
        }
    
        store.add(user);
        resolve(user);
    })
}

function getUsers(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

module.exports = {
    createUser,
    authenticate,
    addUser,
    getUsers,
}