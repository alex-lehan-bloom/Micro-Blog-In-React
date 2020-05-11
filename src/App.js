import React from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import firebase from "./firestore/firebaseSettings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
        // localStorage.setItem("user", user.uid);
      } else {
        this.setState({ user: null });
        // localStorage.removeItem("user")
      }
    });
  }

  render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              {this.state.user ? <HomePage /> : <Login />}
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
