import React from "react";
import "../css/PreviousTweets.css";

function PreviousTweets(props) {
  let { tweets } = props;
  tweets.sort(function (a, b) {
    const keyA = new Date(a.date);
    const keyB = new Date(b.date);
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });

  let tweets_to_display = [];

  tweets.map((tweet, index) => {
    tweets_to_display.push(
      <div className="previous-tweet" key={index}>
        <div className="author-and-date">
          <p className="tweet-author">{tweet.author}</p>
          <p className="tweet-date">{tweet.date}</p>
        </div>
        <p className="tweet-text">{tweet.text}</p>
      </div>
    );
  });
  return tweets_to_display;
}

export default PreviousTweets;
