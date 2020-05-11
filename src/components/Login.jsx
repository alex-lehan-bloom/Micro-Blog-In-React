import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import firebase from "../firestore/firebaseSettings";
import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: null, password: null };
  }

  handleUserEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleUserPassword(event) {
    this.setState({ password: event.target.value });
  }

  async login(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      return Error;
    }
  }

  render() {
    return (
      <div className="login">
        <h1 className="header">Sign in</h1>
        <Form
          onSubmit={(event) => {
            this.login(event);
          }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={(event) => {
                this.handleUserEmail(event);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(event) => {
                this.handleUserPassword(event);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
