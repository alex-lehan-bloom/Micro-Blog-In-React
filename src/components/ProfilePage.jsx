import React from "react";
import Navbar from "./Navbar";
import UsernameForm from "./UsernameForm";
import ProfilePic from "./ProfilePicture";
import LogoutButton from "./LogoutButton";
import "../css/ProfilePage.css";

function ProfilePage() {
  return (
    <>
      <Navbar />
      <div className="profile-page">
        <h1>Profile</h1>
        <UsernameForm />
        <h2>Profile Picture</h2>
        <ProfilePic />
        <h2>Logout</h2>
        <LogoutButton />
      </div>
    </>
  );
}

export default ProfilePage;
