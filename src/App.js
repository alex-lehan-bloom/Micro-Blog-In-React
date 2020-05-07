import React from "react";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/App.css";

class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <HomePage />
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
