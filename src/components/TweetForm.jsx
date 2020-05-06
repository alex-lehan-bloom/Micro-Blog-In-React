import React from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import { addTweet } from "../lib/api.js";
import "../css/TweetForm.css";

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetLengthExceeded: false,
      sendingTweet: false,
      inputValue: "",
      newestTweet: { content: "", userName: "Alex Bloom", date: "" },
    };
  }

  handleUserTypingTweet(event) {
    let date = new Date();
    let tweet = event.target.value;
    if (tweet.length > 140) {
      this.setState({ tweetLengthExceeded: true });
    } else {
      this.setState({
        tweetLengthExceeded: false,
        inputValue: tweet,
        newestTweet: { content: tweet, userName: "Prince", date },
      });
    }
  }

  async handleFormSubmit(event) {
    event.preventDefault();
    let { newestTweet } = this.state;
    this.setState({ sendingTweet: true });
    await addTweet(newestTweet);
    this.setState({ sendingTweet: false, inputValue: "" });
    this.props.newTweetAdded();
  }

  newTweetAdded() {
    let { newTweetAdded } = this.props;
    newTweetAdded();
  }

  render() {
    let { tweetLengthExceeded, sendingTweet, inputValue } = this.state;
    return (
      <Form
        onSubmit={(event) => {
          this.handleFormSubmit(event);
        }}
      >
        <Form.Group controlId="formBasicEmail" className="tweet-form">
          <textarea
            placeholder="What's on your mind..."
            value={inputValue}
            onChange={(event) => {
              this.handleUserTypingTweet(event);
            }}
          ></textarea>
          <div className="alert-and-button-container">
            {tweetLengthExceeded && (
              <Alert variant="danger">
                Tweet can't be more than 140 characters
              </Alert>
            )}

            {!tweetLengthExceeded && !sendingTweet && (
              <Button variant="primary" type="submit">
                Tweet
              </Button>
            )}
            {!tweetLengthExceeded && sendingTweet && (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Sending...
              </Button>
            )}
            {tweetLengthExceeded && (
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
