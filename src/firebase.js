import firebase from 'firebase/app';
import "firebase/auth";
import 'firebase/firestore'

//Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCt00UKfksoqUTY9GQXv4lhMBX64UXfvtY",
  authDomain: "micro-distancia.firebaseapp.com",
  databaseURL: "https://micro-distancia.firebaseio.com",
  projectId: "micro-distancia",
  storageBucket: "micro-distancia.appspot.com",
  messagingSenderId: "39142152714",
  appId: "1:39142152714:web:04cb89e9b620ee23edddf3"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);

const authentication = firebase.auth();
const db = firebase.firestore();
export{authentication,db};