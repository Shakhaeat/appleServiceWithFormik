import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function Navbar(props) {
  const isAuthenticated = useAuth();
  // console.log(isAuthenticated.authTokens);
  const logout = () => {
    props.logout();
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            Home
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated.authTokens ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    {props.currentUser ?? ""}
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logout}>
                    LogOut
                  </a>
                </li>
              </div>
            ) : (
              <div className="navbar-nav ml-auto">
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
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
