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

export async function addUserToFirestore(user) {
  try {
    let response = await firestoreDB
      .collection("users")
      .doc(user.email)
      .set(user);
    return response;
  } catch (error) {
    return "Error";
  }
}

export async function getUsersFromFirestore() {
  const collection = await firestoreDB.collection("users").get();
  const data = collection.docs.map((doc) => doc.data());
  return data;
}

export async function getUserFromFirestore(userEmail) {
  let response = await firestoreDB.collection("users").doc(userEmail).get();
  const data = response.data();
  if (data === undefined) {
    return false;
  } else {
    return data;
  }
}
