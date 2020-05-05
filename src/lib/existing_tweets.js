const tweets = [];

export function getTweets() {
  return tweets;
}

export function addTweet(tweet) {
  tweets.push(tweet);
}
