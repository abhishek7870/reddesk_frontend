import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCDLhSBAlzNlSrjTr_C4K0O1MNRtrrlv7s",
  authDomain: "red-desk.firebaseapp.com",
  projectId: "red-desk",
  storageBucket: "red-desk.appspot.com",
  messagingSenderId: "173944093116",
  appId: "1:173944093116:web:d0c87798550224a60313b9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
