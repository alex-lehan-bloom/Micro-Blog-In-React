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
  return (
    <ul className="all-user-tweets">
      {tweets.map((tweet) => {
        return (
          <>
            <div className="previous-tweet" key={tweet.date}>
              <div className="author-and-date">
                <p className="tweet-author">{tweet.userName}</p>
                <p className="tweet-date">{tweet.date}</p>
              </div>
              <p className="tweet-text">{tweet.content}</p>
            </div>
          </>
        );
      })}
    </ul>
  );
}

export default PreviousTweets;
