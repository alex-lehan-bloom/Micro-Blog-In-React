import axios from "axios";

export async function getTweets() {
  let response = await axios.get(
    "https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet"
  );
  let data = response.data.tweets;
  return data;
}

export async function addTweet(newTweet) {
  try {
    let response = await axios.post(
      "https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet",
      {
        tweet: newTweet,
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
