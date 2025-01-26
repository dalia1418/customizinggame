import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "@firebase/firestore";
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFcHOMFZCYiADSuELeNluKzyRZMCk8OLs",
  authDomain: "seriousgame-b51c2.firebaseapp.com",
  projectId: "seriousgame-b51c2",
  storageBucket: "seriousgame-b51c2.firebasestorage.app",
  messagingSenderId: "457089307507",
  appId: "1:457089307507:web:a38013ad0cf51b5b572b06",
  measurementId: "G-7K2X8XVGTR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const LeaderboardCollectionRef = collection(db, "leaderboard");
export const SessionCollectionsRef = collection(db, "sessionSecondRound");
export const FFMCollectionsRef = collection(db, "bigFiveInventory");
export const SessionCollectionsRef2 = collection(db, "sessionFirstRound");

export const signUpWithCredentials = (
  values: { email: string; password: string },
  callback: (args: any) => void,
  catchCallback: () => void
) =>
  createUserWithEmailAndPassword(auth, values.email, values.password)
    .then((result) => callback(result))
    .catch((error) => {
      catchCallback();
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });

export const logOut = () => signOut(auth);

export const signInWithCredentials = (
  values: {
    email: string;
    password: string;
  },
  callback: (args: any) => void,
  catchCallback: () => void
) =>
  signInWithEmailAndPassword(auth, values.email, values.password)
    .then((result) => callback(result))
    .catch((error) => {
      catchCallback();
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Invalid email and/or password.");
    });

export const getAllLeaderboard = async () => {
  let result: any[] = [];
  const users = await getDocs(LeaderboardCollectionRef);
  users.forEach((doc: any) => {
    let temp;
    temp = { ...doc.data(), id: doc.id };
    result.push(temp);
  });

  return result;
};
