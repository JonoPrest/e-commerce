import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD39--L26ELF8rV3SF3xlPY4Wbce56lbDQ",
  authDomain: "crwn-db-3a12a.firebaseapp.com",
  databaseURL: "https://crwn-db-3a12a.firebaseio.com",
  projectId: "crwn-db-3a12a",
  storageBucket: "crwn-db-3a12a.appspot.com",
  messagingSenderId: "615108075686",
  appId: "1:615108075686:web:02039a72f542c22065d467",
  measurementId: "G-GXE57KZ5BZ",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};



export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
