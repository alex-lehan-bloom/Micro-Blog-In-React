import React from "react";
import { Form, Button, Alert } from "react-bootstrap";
import firebase, {
  auth,
  firebaseGoogleProvider,
} from "../firestore/firebaseSettings";
import { addUserToFirestore } from "../firestore/firestoreAPI";
import "../css/Register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      name: null,
      registrationError: false,
      errorMessage: null,
    };
  }

  handleRegistrationErrors(error) {
    console.log(error);
    this.setState(
      { registrationError: true, errorMessage: error.message },
      () => {
        this.setLoginErrorTimeout();
      }
    );
  }

  setLoginErrorTimeout() {
    setTimeout(() => {
      this.setState({ registrationError: false });
    }, 4000);
  }

  handleUserEmail(event) {
    this.setState({ email: event.target.value });
  }

  handleUserPassword(event) {
    this.setState({ password: event.target.value });
  }

  handleUserName(event) {
    this.setState({ name: event.target.value });
  }

  async registerWithGoogle(event) {
    event.preventDefault();
    if (this.state.name === null) {
      this.handleRegistrationErrors({ message: "Name is required." });
    } else {
      await auth.signInWithPopup(firebaseGoogleProvider);
      this.addRegisteredUserToFireStore();
    }
  }

  async register(event) {
    event.preventDefault();
    if (this.state.name === null) {
      this.handleRegistrationErrors({ message: "Name is required." });
    } else {
      try {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(
            this.state.email,
            this.state.password
          );
        this.addRegisteredUserToFireStore();
      } catch (error) {
        this.handleRegistrationErrors(error);
      }
    }
  }

  addRegisteredUserToFireStore() {
    let user = { name: this.state.name, email: this.state.email };
    addUserToFirestore(user);
  }

  render() {
    let { registrationError: logInError, errorMessage } = this.state;
    return (
      <>
        <div className="register">
          <h1 className="header">Register</h1>
          <Form>
            <Form.Group>
              <Form.Label className="label">Email address</Form.Label>
              <Form.Control
                type="email"
                required
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
                required
                onChange={(event) => {
                  this.handleUserPassword(event);
                }}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="label">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                required
                onChange={(event) => {
                  this.handleUserName(event);
                }}
              />
            </Form.Group>
            <Button
              className="register-button"
              variant="primary"
              onClick={(event) => {
                this.register(event);
              }}
            >
              Register
            </Button>
            <Button
              className="register-google-button"
              variant="success"
              onClick={(event) => {
                this.registerWithGoogle(event);
              }}
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
