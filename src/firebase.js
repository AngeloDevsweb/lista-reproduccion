
import firebase from 'firebase/app'
import 'firebase/firestore'
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyChyWHp0pwSqmhzs1B4AV34pkGebNLxOfA",
    authDomain: "lista-videos-b0cfd.firebaseapp.com",
    projectId: "lista-videos-b0cfd",
    storageBucket: "lista-videos-b0cfd.appspot.com",
    messagingSenderId: "25796696587",
    appId: "1:25796696587:web:74360250865bfc5a1c050e"
  };
  // Initialize Firebase
  const fb=firebase.initializeApp(firebaseConfig);
  export const db = fb.firestore();