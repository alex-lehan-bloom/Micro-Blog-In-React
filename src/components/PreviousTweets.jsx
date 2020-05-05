import React from "react";
import "../css/PreviousTweets.css";

function PreviousTweets(props) {
  let { tweets } = props;
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
