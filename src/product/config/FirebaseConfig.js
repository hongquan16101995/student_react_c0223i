import { initializeApp  } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBTjeD6pmcuF9Nt7wnLUz-qRyNTjtGLwUg",
    authDomain: "react-c0223i.firebaseapp.com",
    projectId: "react-c0223i",
    storageBucket: "react-c0223i.appspot.com",
    messagingSenderId: "161462291326",
    appId: "1:161462291326:web:2be57a763dcc215d48c12f",
    measurementId: "G-JV01MC0PKN"
};

initializeApp(firebaseConfig);

const storage = getStorage()
export default storage;
