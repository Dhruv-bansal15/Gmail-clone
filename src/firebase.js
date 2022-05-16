import {initializeApp} from 'firebase/app'
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'


const firebaseConfig = {
  apiKey: "AIzaSyBJJgEKJGrlUSwxj6jDX2PbcmHLv4fvhks",
  authDomain: "clone-yt-67cff.firebaseapp.com",
  projectId: "clone-yt-67cff",
  storageBucket: "clone-yt-67cff.appspot.com",
  messagingSenderId: "628689633544",
  appId: "1:628689633544:web:80d5b3dec1105cb5632cbd",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

const provider = new GoogleAuthProvider();

export {db, auth, provider};

