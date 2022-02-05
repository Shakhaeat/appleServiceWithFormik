import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min.js";
// import "../../node_modules/bootstrap/dist/js/bootstrap.min";

export default function Navbar(props) {
  const isAuthenticated = useAuth();
  // console.log(isAuthenticated.authTokens.user);
  const logout = () => {
    props.logout();
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to="/" className="navbar-brand" href="#">
        Home
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse my-2 my-lg-0" id="navbarNav">
        {isAuthenticated.authTokens ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                {isAuthenticated.authTokens.user ?? ""}
              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logout}>
                LogOut
              </a>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Sign Up
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}
