import React from "react";
import TweetForm from "./TweetForm";
import PreviousTweets from "./PreviousTweets";
import Navbar from "./Navbar";
import { getTweetsFromServer } from "../lib/api.js";
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayTweets: false, previousTweets: [] };
  }

  componentDidMount() {
    this.refreshData();
  }

  async refreshData() {
    let previousTweets = await getTweetsFromServer();
    this.setState({ displayTweets: true, previousTweets });
  }

  render() {
    let { displayTweets, previousTweets } = this.state;
    return (
      <>
        <Navbar />
        <TweetForm
          newTweetAdded={() => {
            this.refreshData();
          }}
        ></TweetForm>
        {displayTweets && (
          <PreviousTweets tweets={previousTweets}></PreviousTweets>
        )}
      </>
    );
  }
}

export default HomePage;
