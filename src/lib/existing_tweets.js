const tweets = [
  {
    author: "Alex Bloom",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla .",
    date: "2020-05-05 12:40:16.859322",
  },
];

export function getTweets() {
  return tweets;
}

export function addTweet(tweet) {
  tweets.push(tweet);
}
