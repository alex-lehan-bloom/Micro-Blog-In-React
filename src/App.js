import React from "react";
import TweetInput from "./components/TweetInput";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <TweetInput></TweetInput>;
  }
}

export default App;
