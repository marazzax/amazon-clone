import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4tyaOWX_xGJqTdEUKTQ43WXKw3T4vqfw",
  authDomain: "clone-1bce4.firebaseapp.com",
  projectId: "clone-1bce4",
  storageBucket: "clone-1bce4.appspot.com",
  messagingSenderId: "610540626486",
  appId: "1:610540626486:web:0c9f9189ed96ebb567ae97",
  measurementId: "G-KCMD36PZLV",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const db = app.firestore();

export default db;
