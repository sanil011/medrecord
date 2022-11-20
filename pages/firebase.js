// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
apiKey: "AIzaSyB5Y6zSEBAG9tLtFtnQoYzekFPlJ0ofvko",
  authDomain: "medidoc-1978a.firebaseapp.com",
  projectId: "medidoc-1978a",
  storageBucket: "medidoc-1978a.appspot.com",
  messagingSenderId: "475820728056",
  appId: "1:475820728056:web:1f74d6f40c172c965a650d",
  measurementId: "G-9D07ZDD9MZ"
};

const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
