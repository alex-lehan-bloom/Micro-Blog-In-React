import React from "react";
import { NavLink } from "react-router-dom";
import "../css/Navbar.css";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="main-navbar">
        <NavLink
          exact
          to="/"
          className="navbar-link"
          activeClassName="navbar-link-active"
        >
          Home
        </NavLink>
        <NavLink
          exact
          to="/profile"
          className="navbar-link"
          activeClassName="navbar-link-active"
        >
          Profile
        </NavLink>
      </div>
    );
  }
}

export default Navbar;
