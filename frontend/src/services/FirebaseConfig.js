import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// import firebase from 'firebase/app';
// import { getFirestore } from 'firebase/firestore';
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDrWC-KZlafswmsR_YEUgWbKMz0QDW-YGc",
    authDomain: "notetstack-new.firebaseapp.com",
    projectId: "notetstack-new",
    storageBucket: "notetstack-new.appspot.com",
    messagingSenderId: "801174563864",
    appId: "1:801174563864:web:2a4dc82e9a909c369c276d",
    measurementId: "G-LY5831VLRS"
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// export { app, auth, db };
// Initialize Firebase
// initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();