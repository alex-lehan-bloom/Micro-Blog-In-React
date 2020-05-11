import React from "react";
import { Button } from "react-bootstrap";
import firebase from "../firestore/firebaseSettings";

class LogoutButton extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
    this.state = {};
  }

  logout() {
    firebase.auth().signOut();
  }

  render() {
    return (
      <Button className="logout" onClick={this.logout}>
        Logout
      </Button>
    );
  }
}

export default LogoutButton;
