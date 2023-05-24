// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRNKvTRcUNd2_p-kq_kQ5OeaLsFFrMqW0",
  authDomain: "beatit-71fc8.firebaseapp.com",
  projectId: "beatit-71fc8",
  storageBucket: "beatit-71fc8.appspot.com",
  messagingSenderId: "837659504210",
  appId: "1:837659504210:web:67f763be1eeb130a8c398b",
  measurementId: "G-GW9T54FE0F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);
export { auth };