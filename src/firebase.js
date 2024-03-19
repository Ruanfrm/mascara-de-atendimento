import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCDwF0D0JAdKkG6lN-uK3it1FuV4lLwCvI",
    authDomain: "clockjob-6cd4e.firebaseapp.com",
    databaseURL: "https://clockjob-6cd4e-default-rtdb.firebaseio.com",
    projectId: "clockjob-6cd4e",
    storageBucket: "clockjob-6cd4e.appspot.com",
    messagingSenderId: "242581629056",
    appId: "1:242581629056:web:436d016ee645872d965e65"
  };

firebase.initializeApp(firebaseConfig);

export default firebase;
