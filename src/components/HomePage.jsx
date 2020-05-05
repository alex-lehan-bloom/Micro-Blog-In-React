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
    // let tweets = getTweets();
    // this.setState({ previousTweets: tweets });
  }

  refreshData() {
    let previousTweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    this.setState({ previousTweets });
  }
  //   componentDidUpdate() {
  //     localStorage.setItem("contacts", "value");
  //     console.log(localStorage.getItem("contacts"));
  //   }

  render() {
    let { previousTweets } = this.state;
    return (
      <>
        <TweetForm
          newTweetAdded={() => {
            this.newData();
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
