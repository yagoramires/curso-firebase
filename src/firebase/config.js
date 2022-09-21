// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA3p5SGFizh67eMCMuwJkEqanrp-0WJpks',
  authDomain: 'curso-firebase-4dde5.firebaseapp.com',
  projectId: 'curso-firebase-4dde5',
  storageBucket: 'curso-firebase-4dde5.appspot.com',
  messagingSenderId: '291699909195',
  appId: '1:291699909195:web:df556df26752660a49a3ce',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);
export default db;
