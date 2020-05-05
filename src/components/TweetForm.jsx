import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../css/TweetForm.css";

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayAlert: false,
      newestTweet: { text: "", author: "Alex Bloom", date: "" },
    };
  }

  handleUserTypingTweet(event) {
    let date = new Date();
    let tweet = event.target.value;
    if (tweet.length > 140) {
      this.setState({ displayAlert: true });
    } else {
      this.setState({
        displayAlert: false,
        newestTweet: { text: tweet, author: "Alex Bloom", date },
      });
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let { newestTweet } = this.state;
    let existing_tweets = JSON.parse(localStorage.getItem("tweets") || "[]");
    existing_tweets.push(newestTweet);
    localStorage.setItem("tweets", JSON.stringify(existing_tweets));
    this.newTweetAdded();
  }

  newTweetAdded() {
    let { newTweetAdded } = this.props;
    newTweetAdded();
  }

  render() {
    let { displayAlert } = this.state;
    return (
      <Form
        onSubmit={(event) => {
          this.handleFormSubmit(event);
        }}
      >
        <Form.Group controlId="formBasicEmail" className="tweet-form">
          <textarea
            placeholder="What's on your mind..."
            onChange={(event) => {
              this.handleUserTypingTweet(event);
            }}
          ></textarea>
          <div className="alert-and-button-container">
            {displayAlert && (
              <Alert variant="danger">
                Tweet can't be more than 140 characters
              </Alert>
            )}

            {!displayAlert && (
              <Button variant="primary" type="submit">
                Tweet
              </Button>
            )}
            {displayAlert && (
              <Button variant="primary" type="submit" disabled>
                Tweet
              </Button>
            )}
          </div>
        </Form.Group>
      </Form>
    );
  }
}

export default TweetForm;
