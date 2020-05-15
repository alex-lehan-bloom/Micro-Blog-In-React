import React, { Component } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import firebase, {
  auth,
  firebaseGoogleProvider,
} from "../firestore/firebaseSettings";
import LinkToRegisterPage from "./LinkToRegisterPage";
import "../css/Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      logInError: false,
      errorMessage: null,
      user: {},
    };
  }

  handleLoginErrors(error) {
    console.log(error);
    this.setState({ logInError: true, errorMessage: error.message }, () => {
      this.setLoginErrorTimeout();
    });
  }

  setLoginErrorTimeout() {
    setTimeout(() => {
      this.setState({ logInError: false });
    }, 4000);
  }

  handleUserEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleUserPassword(event) {
    this.setState({ password: event.target.value });
  }

  async logInUsernamePassword(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password);
    } catch (error) {
      this.handleLoginErrors(error);
    }
  }

  async LogInWithGoogle(event) {
    event.preventDefault();
    await auth.signInWithPopup(firebaseGoogleProvider);
    this.addUserToLocalStorage();
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
                required={true}
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
                required={true}
                placeholder="Password"
                onChange={(event) => {
                  this.handleUserPassword(event);
                }}
              />
            </Form.Group>
            <Button
              variant="primary"
              onClick={(event) => {
                this.logInUsernamePassword(event);
              }}
            >
              Log In
            </Button>
            <Button
              variant="success"
              onClick={(event) => {
                this.LogInWithGoogle(event);
              }}
            >
              Log In with Google
            </Button>
          </Form>
          <LinkToRegisterPage />
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
