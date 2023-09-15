// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getDatabase} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDf_Cm6U4wCdiJDg1ht7iUg1X0Hh6eq3sY',
  authDomain: 'hdtg-edceb.firebaseapp.com',
  projectId: 'hdtg-edceb',
  storageBucket: 'hdtg-edceb.appspot.com',
  messagingSenderId: '1067744912782',
  appId: '1:1067744912782:web:378e3e04af1131176fb0df',
  measurementId: 'G-ZYHM7CRP48',
  databaseURL: 'https://hdtg-edceb-default-rtdb.firebaseio.com/',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export {firebase};
export default firebaseConfig;
// Initialize Firebase
// export const db = getDatabase();
// export const Firestore = getFirestore();
export const storage = getStorage(app, 'gs://hdtg-edceb.appspot.com');
