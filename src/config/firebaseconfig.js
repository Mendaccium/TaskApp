import firebase from "firebase";
import "firebase/storage"
import { initializeApp } from "firebase/app";



const firebaseConfig = {
  apiKey: "AIzaSyBDDogVJ5buIFAvcBNCPxnmxSM9eBO30lc",
  authDomain: "taskapp-b5432.firebaseapp.com",
  projectId: "taskapp-b5432",
  storageBucket: "taskapp-b5432.appspot.com",
  messagingSenderId: "698057602798",
  appId: "1:698057602798:web:55b95230efc917f056e5ff"
};


const app = firebase.initializeApp(firebaseConfig);


export default firebase;