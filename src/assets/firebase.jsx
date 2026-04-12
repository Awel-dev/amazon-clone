
import { initializeApp } from "firebase/app"
// for auth
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHHR3yX1nalpOf2JUpZDo8KCh0My5qyVY",
  authDomain: "clone-90b80.firebaseapp.com",
  projectId: "clone-90b80",
  storageBucket: "clone-90b80.firebasestorage.app",
  messagingSenderId: "1932929327",
  appId: "1:1932929327:web:ecfe2c91d1fa18f01b59da"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)