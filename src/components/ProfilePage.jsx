import React from "react";
import Navbar from "./Navbar";
import UsernameForm from "./UsernameForm";
import "../css/ProfilePage.css";

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <h1>Profile</h1>
          <UsernameForm></UsernameForm>
        </div>
      </>
    );
  }
}

export default ProfilePage;
