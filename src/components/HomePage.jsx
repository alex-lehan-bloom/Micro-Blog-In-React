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
    let tweets = getTweets();
    this.setState({ previousTweets: tweets });
  }

  render() {
    let { previousTweets } = this.state;
    return (
      <>
        <TweetForm></TweetForm>
        <ul className="all-user-tweets">
          <PreviousTweets tweets={previousTweets}></PreviousTweets>
        </ul>
      </>
    );
  }
}

export default HomePage;
