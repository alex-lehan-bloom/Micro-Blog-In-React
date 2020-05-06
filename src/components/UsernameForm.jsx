import React from "react";
import { Form, Button } from "react-bootstrap";
import "../css/UsernameForm.css";

class UsernameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "anonymous" };
  }

  handleUserTyping(event) {
    this.setState({ username: event.target.value });
  }
  handleOnSubmit(event) {
    event.preventDefault();
    let { username } = this.state;
    localStorage.setItem("currentUser", username);
  }

  componentDidMount() {
    let { username } = this.state;
    localStorage.setItem("currentUser", username);
  }

  render() {
    return (
      <Form
        className="username-form"
        onSubmit={(event) => {
          this.handleOnSubmit(event);
        }}
      >
        <p className="username">User Name</p>
        <input
          type="text"
          onChange={(event) => {
            this.handleUserTyping(event);
          }}
        ></input>
        <Button variant="primary" type="submit">
          Change
        </Button>
      </Form>
    );
  }
}

export default UsernameForm;
