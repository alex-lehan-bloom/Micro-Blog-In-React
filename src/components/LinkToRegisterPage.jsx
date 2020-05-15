import React from "react";
import { Link } from "react-router-dom";
import "../css/LinkToRegisterPage.css";

function LinkToRegisterPage() {
  return (
    <p className="link-to-register-page">
      Don't have an account? <Link to="/register">Register here</Link>.
    </p>
  );
}

export default LinkToRegisterPage;
