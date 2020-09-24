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
    appId: config.fbAppId,
})

async function createUser(email, password) {
    return fb.auth().createUserWithEmailAndPassword(email, password);
}

async function authenticate(email, password) {
        if (!email || !password) {
            console.error('[userController] No hay usuario o password');
            throw new Error('Los datos son incorrectos');
        } else {
            try {
                const data = await fb.auth().signInWithEmailAndPassword(email, password);
                const user = data.user;
                return user
            } catch(e) {
                throw new Error(e);
            }
        }
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