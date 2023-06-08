// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
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
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
const googleAuth = new GoogleAuthProvider();
GoogleSignin.configure({
    scopes: [], // what API you want to access on behalf of the user, default is email and profile
    webClientId: "837659504210-q201tpkfd7aq9f4qs65v0fous2k09cmf.apps.googleusercontent.com", // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: '', // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: '', // [Android] specifies an account name on the device that should be used
    // iosClientId: '<FROM DEVELOPER CONSOLE>', // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
    openIdRealm: '', // [iOS] The OpenID2 realm of the home web server. This allows Google to include the user's OpenID Identifier in the OpenID Connect ID token.
    profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});
const auth = getAuth(app);
export { auth, googleAuth };