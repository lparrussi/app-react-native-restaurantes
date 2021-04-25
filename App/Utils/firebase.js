import firebase from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyArW60dPiZFe0O2t7ELp7GdsSMh2FfaoXk",
    authDomain: "tenedores-b5d4f.firebaseapp.com",
    projectId: "tenedores-b5d4f",
    storageBucket: "tenedores-b5d4f.appspot.com",
    messagingSenderId: "875653326367",
    appId: "1:875653326367:web:1bde0259cf9df3e08b572a"
  };
  // Initialize Firebase

  export const firebaseApp = firebase.initializeApp(firebaseConfig);