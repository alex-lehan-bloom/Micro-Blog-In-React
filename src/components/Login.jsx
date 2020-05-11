import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import firebase, {
  auth,
  firebaseGoogleProvider,
} from "../firestore/firebaseSettings";
import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      logInError: false,
      errorMessage: null,
    };
    this.logIn = this.logIn.bind(this);
    this.googleLogIn = this.googleLogIn.bind(this);
    this.register = this.register.bind(this);
  }

  handleLoginErrors(error) {
    if (error === "auth/argument-error") {
      this.setState({
        logInError: true,
        errorMessage: "You need to enter a password.",
      });
    } else if (error === "auth/user-not-found") {
      this.setState({
        logInError: true,
        errorMessage: "Email does not exist. Please register.",
      });
    } else if (error === "auth/wrong-password") {
      this.setState({
        logInError: true,
        errorMessage: "Incorrect password.",
      });
    } else if (error === "auth/invalid-email") {
      this.setState({
        logInError: true,
        errorMessage: "Invalid email.",
      });
    } else {
      this.setState({
        logInError: true,
        errorMessage: "Unknown error. Please try again.",
      });
    }
    this.initiateLoginErrorTimeout();
  }

  initiateLoginErrorTimeout() {
    setTimeout(() => {
      this.setState({ logInError: false });
    }, 2000);
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
      this.handleLoginErrors(error.code);
    }
  }

  googleLogIn(event) {
    event.preventDefault();
    auth.signInWithPopup(firebaseGoogleProvider);
  }

  async register(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      this.handleLoginErrors(error.code);
    }
  }

  render() {
    let { logInError, errorMessage } = this.state;

    return (
      <>
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
            <Button
              className="register"
              variant="danger"
              onClick={this.register}
            >
              Register
            </Button>
          </Form>
        </div>
        {logInError && (
          <Alert variant="danger" className="login-error">
            {errorMessage}
          </Alert>
        )}
      </>
    );
  }
}

export default Login;
