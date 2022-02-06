import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAD2mUyM766w28FCWTHvrB-0dFl9ZgeJzw",
  authDomain: "app-odonsys-477a8.firebaseapp.com",
  projectId: "app-odonsys-477a8",
  storageBucket: "app-odonsys-477a8.appspot.com",
  messagingSenderId: "129839946362",
  appId: "1:129839946362:web:5534bfdfb6a5088e3a79c3"
};

const app = initializeApp(firebaseConfig)

export const dataBase = getFirestore(app)