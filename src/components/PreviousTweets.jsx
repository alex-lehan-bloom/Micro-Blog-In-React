import React from "react";
import AppContext from "../context/AppContext";
import "../css/PreviousTweets.css";

function PreviousTweets() {
  return (
    <AppContext.Consumer>
      {(context) => (
        <ul className="all-user-tweets">
          {context.tweets.map((tweet, index) => {
            return (
              <div key={index}>
                <div className="previous-tweet">
                  <div className="author-and-date">
                    <p className="tweet-author">{tweet.userName}</p>
                    <p className="tweet-date">{tweet.date}</p>
                  </div>
                  <p className="tweet-text">{tweet.content}</p>
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </AppContext.Consumer>
  );
}
export default PreviousTweets;
