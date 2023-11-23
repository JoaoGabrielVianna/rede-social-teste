import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyC2AYcXdNdIgIMyX94GYjTLDu56Lrk-zmQ",
    authDomain: "my-project-2023-0.firebaseapp.com",
    projectId: "my-project-2023-0",
    storageBucket: "my-project-2023-0.appspot.com",
    messagingSenderId: "444431965722",
    appId: "1:444431965722:web:0a384e4e86486576c5fba3",
    measurementId: "G-TDM1XKZCVF"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
export const storage = getStorage(app);
