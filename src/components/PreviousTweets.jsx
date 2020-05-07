import React, { Component } from "react";
import { addTweetToServer } from "../lib/api";
import AppContext from "../context/AppContext";
import "../css/PreviousTweets.css";

class PreviousTweets extends Component {
  render() {
    return (
      <AppContext.Consumer>
        {(context) => (
          <ul className="all-user-tweets">
            {context.tweets.map((tweet) => {
              return (
                <div key={tweet.date}>
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
}
export default PreviousTweets;
