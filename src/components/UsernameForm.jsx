import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import "../css/UsernameForm.css";

class UsernameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", nameChanged: false };
  }

  handleUserTyping(event) {
    this.setState({ username: event.target.value }, () => {
      console.log(this.state.username);
    });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    let { username } = this.state;
    localStorage.setItem("currentUser", username);
    this.setState({ nameChanged: true });
  }

  closeNameChangeAlert() {
    this.setState({ nameChanged: false });
  }

  render() {
    let { username, nameChanged } = this.state;
    console.log("render", this.state.username);
    return (
      <>
        <Form
          className="username-form"
          onSubmit={(event) => {
            this.handleOnSubmit(event);
          }}
        >
          <p className="username">User Name</p>
          <input
            type="text"
            value={username}
            onChange={(event) => {
              this.handleUserTyping(event);
            }}
          ></input>
          <Button variant="primary" type="submit">
            Change
          </Button>
        </Form>
        {nameChanged && (
          <Alert
            variant="success"
            className="name-successfully-changed"
            dismissible
            onClose={() => {
              this.closeNameChangeAlert();
            }}
          >
            Username successfully changed to
            <span className="username-in-success-message"> {username}</span>.
          </Alert>
        )}
      </>
    );
  }
}

export default UsernameForm;
