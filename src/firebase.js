import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = firebase.initializeApp({
  apiKey: "AIzaSyAOn1iIx0MwN65jl6e3fmSQFJV3iA_-jyA",
    authDomain: "travel-website-development.firebaseapp.com",
    databaseURL: "https://travel-website-development.firebaseio.com",
    projectId: "travel-website-development",
    storageBucket: "travel-website-development.appspot.com",
    messagingSenderId: "111889721697",
    appId: "1:111889721697:web:7bbdc32ee8583576f67d20",
    measurementId: "G-JVYCR5045M"
})

export const auth = config.auth();

export default firebase
