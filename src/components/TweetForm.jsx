import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../css/TweetForm.css";

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { displayAlert: false, tweet: "" };
  }

  handleUserTypingTweet(event) {
    let tweet = event.target.value;
    if (tweet.length > 5) {
      this.setState({ displayAlert: true });
    } else {
      this.setState({ displayAlert: false, tweet });
    }
  }

  render() {
    let { displayAlert } = this.state;
    return (
      <Form>
        <Form.Group controlId="formBasicEmail" className="tweet-form">
          <div className="main-content">
            <textarea
              placeholder="What's on your mind..."
              onChange={(event) => {
                this.handleUserTypingTweet(event);
              }}
            ></textarea>
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
          {displayAlert && (
            <Alert variant="danger">
              Tweet can't be more than 140 characters
            </Alert>
          )}
        </Form.Group>
      </Form>
    );
  }
}

export default TweetForm;
