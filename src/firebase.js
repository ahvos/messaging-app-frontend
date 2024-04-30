import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';                     //for authentication
import 'firebase/compat/storage';                  //for storage
import 'firebase/compat/database';                 //for realtime database
import 'firebase/compat/firestore';                //for cloud firestore


const firebaseConfig = {
    apiKey: "AIzaSyDlPqnZDXhHtGIgVUm3tn4jU2rMj8fjrOw",
    authDomain: "messaging-app-4e73b.firebaseapp.com",
    projectId: "messaging-app-4e73b",
    storageBucket: "messaging-app-4e73b.appspot.com",
    messagingSenderId: "164127142743",
    appId: "1:164127142743:web:11cc61adbb795e6ba04412"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export { auth, provider }
export default db