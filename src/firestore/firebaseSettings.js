import firebase from "firebase";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCflGFAZRCOnZI-cjHUEt2qcwoNUiVb9X0",
  authDomain: "micro-blog-in-react.firebaseapp.com",
  databaseURL: "https://micro-blog-in-react.firebaseio.com",
  projectId: "micro-blog-in-react",
  storageBucket: "micro-blog-in-react.appspot.com",
  messagingSenderId: "190149208338",
  appId: "1:190149208338:web:c2e08909579ae8cbd9ebcb",
  measurementId: "G-TYDWXT6ZXF",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const firestoreDB = firebase.firestore();
const auth = firebase.auth();
const firebaseGoogleProvider = new firebase.auth.GoogleAuthProvider();

export default firebase;
export { firestoreDB, auth, firebaseGoogleProvider };
