import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/TweetForm.css";

class TweetForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="formBasicEmail" className="tweet-form">
          <textarea placeholder="What's on your mind..."></textarea>
          {/* <input
            type="text"
            placeholder="What's on your mind"
            className="tweet-input-field"
          ></input> */}
          <Button variant="primary" type="submit">
            Tweet
          </Button>
        </Form.Group>
      </Form>
    );
  }
}

export default TweetForm;
