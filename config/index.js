// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChCncwQyRguFnFnbZYkvvZKjDuc6wdSqg",
  authDomain: "reactnative-c8563.firebaseapp.com",
  projectId: "reactnative-c8563",
  storageBucket: "reactnative-c8563.appspot.com",
  messagingSenderId: "229749122569",
  appId: "1:229749122569:web:abb09af21aca504e88fad8",
  measurementId: "G-M0DPJ7Q68T"
};

// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
export default firebase;


 

