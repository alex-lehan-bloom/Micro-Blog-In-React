import React from "react";
import { Spinner, Button } from "react-bootstrap";
import { storage } from "../firestore/firebaseSettings";
import "../css/ProfilePic.css";

class ProfilePic extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, url: "", downloadingPicture: false };
  }

  handleFile(event) {
    if (event.target.files[0]) {
      this.setState({ image: event.target.files[0] }, () => {
        console.log(this.state.image);
        this.handleUpload();
      });
    }
  }
  handleUpload() {
    this.setState({ downloadingPicture: true });
    const uploadTask = storage
      .ref(`images/${this.state.image.name}`)
      .put(this.state.image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(this.state.image.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            this.setState({ url, downloadingPicture: false });
          });
      }
    );
  }

  render() {
    let { url, downloadingPicture } = this.state;
    return (
      <div className="profile-pic-all-container">
        <input
          type="file"
          name="file"
          id="file"
          className="inputfile"
          onChange={(event) => {
            this.handleFile(event);
          }}
        />
        {!downloadingPicture && (
          <Button variant="primary" className="profile-pic-upload-button">
            <label htmlFor="file" className="profile-pic-upload">
              Upload pic
            </label>
          </Button>
        )}
        {downloadingPicture && (
          <>
            <Button
              variant="primary"
              className="profile-pic-upload-button"
              disabled="true"
            >
              <label htmlFor="file" className="profile-pic-upload">
                Upload pic
              </label>
            </Button>
            <Spinner animation="grow" className="downloading-picture" />
          </>
        )}
        {url && (
          <div className="profile-pic-container">
            <img src={url} className="profile-pic" />
          </div>
        )}
      </div>
    );
  }
}

export default ProfilePic;
