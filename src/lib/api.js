import axios from "axios";

let serverURL = "https://itc-bootcamp-19-dot-charcha-dev.appspot.com/tweet";

export async function getTweetsFromServer() {
  let response = await axios.get(serverURL);
  let data = response.data.tweets;
  return data;
}

export async function addTweetToServer(newTweet) {
  try {
    let response = await axios.post(serverURL, {
      tweet: newTweet,
    });
    return response;
  } catch (error) {
    return error;
  }
}
