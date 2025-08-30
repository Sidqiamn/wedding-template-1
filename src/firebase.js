import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkKXCIsS_VKfGIUva6PeXuvQzv3fmaBmo",
  authDomain: "wedding-sidqi.firebaseapp.com",
  projectId: "wedding-sidqi",
  storageBucket: "wedding-sidqi.firebasestorage.app",
  messagingSenderId: "796682371380",
  appId: "1:796682371380:web:1431fb4d7fcd634f8b2561",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
