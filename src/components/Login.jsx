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
      user: {},
    };
    this.logInUsernamePassword = this.logInUsernamePassword.bind(this);
    this.LogInWithGoogle = this.LogInWithGoogle.bind(this);
    this.register = this.register.bind(this);
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
      this.addUserToLocalStorage();
    } catch (error) {
      this.handleLoginErrors(error);
    }
  }

  async LogInWithGoogle(event) {
    event.preventDefault();
    await auth.signInWithPopup(firebaseGoogleProvider);
    this.addUserToLocalStorage();
  }

  async register(event) {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password);
      this.addUserToLocalStorage();
    } catch (error) {
      this.handleLoginErrors(error.code);
    }
  }

  addUserToLocalStorage() {
    localStorage.setItem("currentUser", this.state.email);
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
            <Button variant="primary" onClick={this.logInUsernamePassword}>
              Log In
            </Button>
            <Button
              className="register"
              variant="success"
              onClick={this.LogInWithGoogle}
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
