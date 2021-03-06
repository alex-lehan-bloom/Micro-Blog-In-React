import React from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import firebase, { auth } from "./firestore/firebaseSettings";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {} };
  }

  async componentDidMount() {
    this.authListener();
  }

  authListener() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: auth.currentUser.uid });
      } else {
        this.setState({ user: null });
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
              {this.state.user ? <ProfilePage /> : <Login />}
            </Route>
            <Route exact path="/register">
              {this.state.user ? <HomePage /> : <Register />}
            </Route>
          </Switch>
        </Router>
      </AppProvider>
    );
  }
}

export default App;
