import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import firebase, {
  auth,
  firebaseGoogleProvider,
} from "../firestore/firebaseSettings";
import "../css/Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      logInError: false,
      errorMessage: null,
      user: {},
    };
    this.LogInWithGoogle = this.registerWithGoogle.bind(this);
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

  async registerWithGoogle(event) {
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
      this.handleLoginErrors(error);
    }
  }

  addUserToLocalStorage() {
    localStorage.setItem("currentUser", this.state.email);
  }

  render() {
    let { logInError, errorMessage } = this.state;
    return (
      <>
        <div className="register">
          <h1 className="header">Register</h1>
          <Form>
            <Form.Group>
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
            <Form.Group>
              <Form.Label className="label">Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                required={true}
                onChange={(event) => {
                  this.handleUserPassword(event);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Name</Form.Label>
              <Form.Control
                type="username"
                placeholder="Password"
                required
                onChange={(event) => {
                  this.handleUserPassword(event);
                }}
              />
            </Form.Group>
            <Button
              className="register-button"
              variant="danger"
              onClick={this.register}
            >
              Register
            </Button>
            <p className="register-or">Or</p>
            <Button
              className="register-google-button"
              variant="success"
              onClick={this.registerWithGoogle}
            >
              Register with Google
            </Button>
          </Form>
        </div>
        {logInError && (
          <Alert variant="danger" className="register-error">
            {errorMessage}
          </Alert>
        )}
      </>
    );
  }
}

export default Register;
