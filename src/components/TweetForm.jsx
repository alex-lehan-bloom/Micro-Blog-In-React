import React from "react";
import { Form, Button, Spinner, Alert } from "react-bootstrap";
import AppContext from "../context/AppContext";
import { addTweetToFirestore } from "../firestore/firestoreAPI";
import "../css/TweetForm.css";

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      newestTweet: { content: "", userName: "Alex Bloom", date: "" },
      tweetLengthExceeded: false,
      sendingTweet: false,
      tweetFailed: false,
    };
  }

  handleUserTypingTweet(event) {
    let date = new Date().toISOString();
    let tweet = event.target.value;
    let currentUser = localStorage.getItem("currentUser");
    if (currentUser === null) {
      currentUser = "anonymous";
    }
    if (tweet.length > 140) {
      this.setState({ tweetLengthExceeded: true });
    } else {
      this.setState({
        tweetLengthExceeded: false,
        inputValue: tweet,
        newestTweet: { content: tweet, userName: currentUser, date },
      });
    }
  }

  async addTweetToServer(event) {
    event.preventDefault();
    let { newestTweet } = this.state;
    this.setState({ sendingTweet: true });
    let response = await addTweetToFirestore(newestTweet);
    if (response !== "Error") {
      this.setState({ sendingTweet: false, inputValue: "" });
    } else {
      this.setState({ tweetFailed: true, sendingTweet: false });
      setTimeout(() => {
        this.setState({ tweetFailed: false });
      }, 2000);
    }
  }

  render() {
    let {
      newestTweet,
      inputValue,
      sendingTweet,
      tweetLengthExceeded,
      tweetFailed,
    } = this.state;
    return (
      <AppContext.Consumer>
        {(context) => (
          <Form
            onSubmit={(event) => {
              this.addTweetToServer(event);
              context.addTweetLocally(newestTweet);
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
                  <>
                    <Alert variant="danger">
                      Tweet can't be more than 140 characters
                    </Alert>
                    <Button variant="primary" type="submit" disabled>
                      Tweet
                    </Button>
                  </>
                )}
                {tweetFailed && (
                  <Alert variant="danger">
                    Tweet failed to upload. Please try again.
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
              </div>
            </Form.Group>
          </Form>
        )}
      </AppContext.Consumer>
    );
  }
}

export default TweetForm;
