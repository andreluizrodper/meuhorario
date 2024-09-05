import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAIcAl7c2ZiaDZdvXNhxgIu-ylyWUBLkSk",
  authDomain: "getbooked-2184b.firebaseapp.com",
  projectId: "getbooked-2184b",
  storageBucket: "getbooked-2184b.appspot.com",
  messagingSenderId: "938538380113",
  appId: "1:938538380113:web:ff2e1343b81510bdaac170",
  measurementId: "G-X9XMF6Z0DC",
};

const app = initializeApp(firebaseConfig, "GetBooked");
const auth = await getAuth(app);

export { auth };
