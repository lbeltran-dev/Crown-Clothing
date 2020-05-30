import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyD0xKk9Wa5SPgYVMbM_0Ut5lIewVgjAG4w",
  authDomain: "crown-db-1c888.firebaseapp.com",
  databaseURL: "https://crown-db-1c888.firebaseio.com",
  projectId: "crown-db-1c888",
  storageBucket: "crown-db-1c888.appspot.com",
  messagingSenderId: "612998364130",
  appId: "1:612998364130:web:48d75e651ee55046c397bb",
  measurementId: "G-ZGVXRRN1W0",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
