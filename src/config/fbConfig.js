import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCD5bKMGfyJ8BLUeO-aNAXDkKcYVjr1Ot8",
  authDomain: "ttmannagement.firebaseapp.com",
  databaseURL: "https://ttmannagement.firebaseapp.com",
  projectId: "ttmannagement",
  storageBucket: "ttmannagement.appspot.com",
  messagingSenderId: "823096567451",
  appId: "1:823096567451:web:c509234e258d1006fec83e",
  measurementId: "G-YZY5CSMGEP"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase 