import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import firebase, { logInWithGoogle } from "../firestore/firebaseSettings";
import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.login = this.logIn.bind(this);
    this.googleLogIn = this.googleLogIn.bind(this);
    this.register = this.register.bind(this);

    this.state = { email: null, password: null };
  }

  handleUserEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleUserPassword(event) {
    this.setState({ password: event.target.value });
  }

  async logIn(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      return Error;
    }
  }

  googleLogIn(event) {
    event.preventDefault();
    logInWithGoogle();
  }

  async register(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      return Error;
    }
  }
  render() {
    return (
      <div className="login">
        <h1 className="header">Sign in</h1>
        <Form>
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
          <Button variant="primary" onClick={this.logIn}>
            Log In
          </Button>
          <Button
            className="register"
            variant="success"
            onClick={this.googleLogIn}
          >
            Log In with Google
          </Button>
          <Button className="register" variant="danger" onClick={this.register}>
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
