import React from "react";
import Navbar from "./Navbar";
import UsernameForm from "./UsernameForm";
import "../css/ProfilePage.css";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="profile-page">
        <h1>Profile</h1>
        <UsernameForm />
      </div>
    </>
  );
}

export default ProfilePage;
