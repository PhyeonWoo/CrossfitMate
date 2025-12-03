// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDb62jlcrVEADC0_6iSGPa4xO-_XNz1gck",
  authDomain: "crossfit-2e270.firebaseapp.com",
  projectId: "crossfit-2e270",
  storageBucket: "crossfit-2e270.firebasestorage.app",
  messagingSenderId: "744518142178",
  appId: "1:744518142178:web:e86da6001e712973dd76bb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;