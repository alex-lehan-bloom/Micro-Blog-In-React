import React, { Component } from "react";
import AppContext from "./AppContext";
import { getTweetsFromFirestore } from "../firestore/firestoreAPI";

class AppProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      interval: null,
    };
  }

  sortTweetsByDate(tweets) {
    // Newest tweet will be first, oldest last
    return tweets.sort(function (a, b) {
      const keyA = new Date(a.date);
      const keyB = new Date(b.date);
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
  }

  async componentDidMount() {
    let tweets_from_server = await getTweetsFromFirestore();
    tweets_from_server = this.sortTweetsByDate(tweets_from_server);
    this.setState({ tweets: tweets_from_server });
    let interval = setInterval(async () => {
      tweets_from_server = await getTweetsFromFirestore();
      this.setState({ tweets: tweets_from_server });
    }, 180000);
    this.setState({ interval: interval });
  }

  componentWillUnmount() {
    let { interval } = this.state;
    clearInterval(interval);
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
