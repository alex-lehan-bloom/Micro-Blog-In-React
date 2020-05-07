import React, { Component } from "react";
import AppContext from "./AppContext";
import { getTweetsFromServer } from "../lib/api";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      interval: null,
    };
  }

  async componentDidMount() {
    let tweets_from_server = await getTweetsFromServer();
    this.setState({ tweets: tweets_from_server });
    const interval = setInterval(async () => {
      tweets_from_server = await getTweetsFromServer();
      this.setState({ interval: interval, tweets: tweets_from_server });
    }, 300000);
  }

  componentWillUnmount() {
    clearInterval(this.state.interval);
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          tweets: this.state.tweets,
          addTweetLocally: (tweet) => {
            let existing_tweets = this.state.tweets;
            existing_tweets.unshift(tweet);
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
