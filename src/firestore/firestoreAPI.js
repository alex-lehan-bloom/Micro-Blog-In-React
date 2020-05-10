import { firestoreDB } from "./firebaseSettings";

export async function getTweetsFromFirestore() {
  const collection = await firestoreDB.collection("tweets").get();
  const data = collection.docs.map((doc) => doc.data());
  return data;
}

export async function addTweetToFirestore(tweet) {
  try {
    let response = await firestoreDB.collection("tweets").add(tweet);
    return response;
  } catch (error) {
    return "Error";
  }
}
