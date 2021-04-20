import firebase from 'firebase'

firebase.initializeApp ({
    apiKey: "AIzaSyAcWUThYs_YO-7RfE1DnlaF5jY7vgY6EjM",
    authDomain: "stomble-29798.firebaseapp.com",
    projectId: "stomble-29798",
    storageBucket: "stomble-29798.appspot.com",
    messagingSenderId: "985418817850",
    appId: "1:985418817850:web:a0e6c07e5c53367d72f003",
    measurementId: "G-6JJXVXK6HW"

})

const firestore = firebase.firestore();
export default firestore;
