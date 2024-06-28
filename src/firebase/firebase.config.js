// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyC4UNRa2UuEi4OI8BIIDn8VSL-FQm3ejAM",
//   authDomain: "quickbite-8faa4.firebaseapp.com",
//   projectId: "quickbite-8faa4",
//   storageBucket: "quickbite-8faa4.appspot.com",
//   messagingSenderId: "324544164954",
//   appId: "1:324544164954:web:88bf87044ba7586f8dd463"
// };
const firebaseConfig = {
  apiKey: "AIzaSyC4UNRa2UuEi4OI8BIIDn8VSL-FQm3ejAM",
  authDomain: "quickbite-8faa4.firebaseapp.com",
  projectId: "quickbite-8faa4",
  storageBucket: "quickbite-8faa4.appspot.com",
  messagingSenderId: "324544164954",
  appId: "1:324544164954:web:88bf87044ba7586f8dd463"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
