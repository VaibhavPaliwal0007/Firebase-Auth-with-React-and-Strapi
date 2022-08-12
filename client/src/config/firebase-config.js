
import firebase from "firebase/compat/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "",
  authDomain: "auth-486d8.firebaseapp.com",
  projectId: "auth-486d8",
  storageBucket: "auth-486d8.appspot.com",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

// Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
