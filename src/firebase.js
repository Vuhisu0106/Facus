import firebase from 'firebase/app';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyBjYicfeSLcTHCTPkVHPaOeJOvne9iAuug',
    authDomain: 'facus-f9b9c.firebaseapp.com',
    projectId: 'facus-f9b9c',
    storageBucket: 'facus-f9b9c.appspot.com',
    messagingSenderId: '401562491338',
    appId: '1:401562491338:web:eb4a4e8cf29baa5d069733',
    measurementId: 'G-9SE28MPQWB',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.fireStore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
