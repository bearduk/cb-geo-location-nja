import firebase from 'firebase'
import firestore from 'firebase/firestore/'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyCnvlntdkLn92fPFctMKeV4q6w-X90uGAg",
    authDomain: "cb-geo-location-nja.firebaseapp.com",
    databaseURL: "https://cb-geo-location-nja.firebaseio.com",
    projectId: "cb-geo-location-nja",
    storageBucket: "cb-geo-location-nja.appspot.com",
    messagingSenderId: "853165756064"
  };

const firebaseApp =  firebase.initializeApp(config);

export default firebaseApp.firestore()