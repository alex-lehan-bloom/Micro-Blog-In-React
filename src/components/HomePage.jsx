import React from "react";
import TweetForm from "./TweetForm";
import PreviousTweets from "./PreviousTweets";
import { getTweets, addTweet } from "../lib/existing_tweets";

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { previousTweets: [] };
  }

  componentDidMount() {
    this.refreshData();
  }

  refreshData() {
    let previousTweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    this.setState({ previousTweets });
  }

  render() {
    let { previousTweets } = this.state;
    return (
      <>
        <TweetForm
          newTweetAdded={() => {
            this.refreshData();
          }}
        ></TweetForm>
        <ul className="all-user-tweets">
          <PreviousTweets tweets={previousTweets}></PreviousTweets>
        </ul>
      </>
    );
  }
}

export default HomePage;
