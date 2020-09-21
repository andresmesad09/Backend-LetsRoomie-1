const firebase = require("firebase/app");
require("firebase/auth");
const store = require('./store');

const fb = firebase.initializeApp({
    apiKey: "AIzaSyAtPmgaRv-KaiRtHHxxGdsWcNn0Uz_CDdg",
    authDomain: "letsrommie2020.firebaseapp.com",
    databaseURL: "https://letsrommie2020.firebaseio.com",
    projectId: "letsrommie2020",
    storageBucket: "letsrommie2020.appspot.com",
    messagingSenderId: "178671638304",
    appId: "1:178671638304:web:9e5e6b1a0eba8f1dc7e945"
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