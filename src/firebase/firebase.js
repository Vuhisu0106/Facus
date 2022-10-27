import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
//import { getAnalytics } from 'firebase/analytics';

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

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage();

// const provider = new firebase.auth.GoogleAuthProvider();
export default app;
export { db, auth, storage };
