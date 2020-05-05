import React from "react";
import TweetForm from "./TweetForm";
import PreviousTweets from "./PreviousTweets";
import { getTweets } from "../lib/api.js";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayTweets: false, previousTweets: [] };
  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    let previousTweets = await getTweets();
    this.setState({ displayTweets: true, previousTweets });
  }

  render() {
    let { displayTweets, previousTweets } = this.state;
    return (
      <>
        <TweetForm
          newTweetAdded={() => {
            this.refreshData();
          }}
        ></TweetForm>
        <ul className="all-user-tweets">
          {displayTweets && (
            <PreviousTweets tweets={previousTweets}></PreviousTweets>
          )}
        </ul>
      </>
    );
  }
}

export default HomePage;
