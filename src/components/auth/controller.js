const firebase = require("firebase/app");
require("firebase/auth");

const fb = firebase.initializeApp({
    apiKey: "AIzaSyAtPmgaRv-KaiRtHHxxGdsWcNn0Uz_CDdg",
    authDomain: "letsrommie2020.firebaseapp.com",
    databaseURL: "https://letsrommie2020.firebaseio.com",
    projectId: "letsrommie2020",
    storageBucket: "letsrommie2020.appspot.com",
    messagingSenderId: "178671638304",
    appId: "1:178671638304:web:9e5e6b1a0eba8f1dc7e945"
})

exports.addUser = (email, password) =>
fb.auth().createUserWithEmailAndPassword(email, password);

exports.authenticate = (email, password) =>
fb.auth().signInWithEmailAndPassword(email, password);
