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
                const userId = data.user;
                const user = await store.getAuth(userId.uid)
                return user
            } catch(e) {
                throw new Error(e);
            }
        }
    }
    async function logout() {
        try {
            const data = await fb.auth().signOut();
        } catch(e) {
            throw new Error(e);
        }
    }
    


function addUser(user) {
    return new Promise((resolve, reject) => {
        if (!user) {
            console.error('[userController] No hay usuario');
            reject('Los datos son incorrectos');
            return false;
        }
    
        const newUser = store.add(user);
        resolve(newUser);
    })
}

function getUsers(filterUser) {
    return new Promise((resolve, reject) => {
        resolve(store.list(filterUser));
    })
}

function deleteUser(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            console.log('[User controller] No id to eliminate');
            reject('Missing id');
            return false;
        }

        resolve(store.delete(id));
    })
}

function updateUser(id, data) {
    return new Promise((resolve, reject) => {
        if (!id || !data) {
            console.log('[User controller] no data to update');
            reject('No data or id to update');
        }

        resolve(store.update(id, data))
    })
}

module.exports = {
    createUser,
    authenticate,
    addUser,
    getUsers,
    deleteUser,
    updateUser,
    logout
}