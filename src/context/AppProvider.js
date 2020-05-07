import React, { Component } from "react";
import AppContext from "./AppContext";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
    };
  }

  componentDidMount() {
    let existing_tweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    this.setState({ tweets: existing_tweets });
  }

  render() {
    let existing_tweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    return (
      <AppContext.Provider
        value={{
          tweets: this.state.tweets,
          addTweetLocally: (tweet) => {
            existing_tweets = JSON.parse(
              localStorage.getItem("tweets") || "[]"
            );
            existing_tweets.unshift(tweet);
            localStorage.setItem("tweets", JSON.stringify(existing_tweets));
          },
          refreshLocalTweets: () => {
            existing_tweets = JSON.parse(
              localStorage.getItem("tweets") || "[]"
            );
            this.setState({ tweets: existing_tweets });
          },
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppProvider;
