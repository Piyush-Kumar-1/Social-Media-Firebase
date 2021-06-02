import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBBa8wJgrHDNNT6snzS4N1MUVK7OVW-SAU",
  authDomain: "instagram-dbe39.firebaseapp.com",
  projectId: "instagram-dbe39",
  storageBucket: "instagram-dbe39.appspot.com",
  messagingSenderId: "148730635895",
  appId: "1:148730635895:web:04ee29d4267bb0a33cc872",
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;
const auth = firebase.auth();

export { firebase, FieldValue, auth };
