
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBy0UE9hHBAlUgp_Y_rspWDIsMpyXjv6_g",
  authDomain: "auth-486d8.firebaseapp.com",
  projectId: "auth-486d8",
  storageBucket: "auth-486d8.appspot.com",
  messagingSenderId: "630621169979",
  appId: "1:630621169979:web:7143345d97fe3b65a8ef1e",
  measurementId: "G-QDD5927M7Q"
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);