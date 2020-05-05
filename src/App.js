import React from "react";
import HomePage from "./components/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <HomePage />;
  }
}

export default App;
