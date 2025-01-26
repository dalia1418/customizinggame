import {
  db,
  FFMCollectionsRef,
  LeaderboardCollectionRef,
  SessionCollectionsRef,
  SessionCollectionsRef2,
} from "./Firebase";
import {
  getDocs,
  query,
  where,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

export const addToLeaderboard = async (values: {
  name: string;
  score: number;
}) => {
  const entry = {
    name: values.name,
    score: values.score,
  };

  await addDoc(LeaderboardCollectionRef, entry);
};

export const addSession = async (userId: string, session: string) => {
  const entry = {
    userId,
    session,
  };

  try {
    await addDoc(SessionCollectionsRef, entry);
  } catch (e) {
    console.error(e);
    try {
      console.error("failed sending, retrying");
      await addDoc(SessionCollectionsRef, entry);
    } catch (e) {
      console.error(e);
    }
  }
};
export const addSession2 = async (userId: string, session: string) => {
  const entry = {
    userId,
    session,
  };

  try {
    await addDoc(SessionCollectionsRef2, entry);
  } catch (e) {
    console.error(e);
    try {
      console.error("failed sending, retrying");
      await addDoc(SessionCollectionsRef2, entry);
    } catch (e) {
      console.error(e);
    }
  }
};
export const addScores = async (userId: string, scores: string) => {
  const entry = {
    userId,
    scores,
  };

  try {
    await addDoc(FFMCollectionsRef, entry);
  } catch (e) {
    console.log(e);
    try {
      console.error("failed sending, retrying");
      await addDoc(FFMCollectionsRef, entry);
    } catch (e) {
      console.error(e);
    }
  }
};

export const hasFinishedAssessment = async (userId: string) => {
  let ids: string[] = [];
  const entrys = await getDocs(FFMCollectionsRef);
  entrys.forEach((doc: any) => {
    let temp;
    temp = { ...doc.data() };
    ids.push(temp.userId);
  });
  return ids.includes(userId);
};
