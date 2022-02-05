import React, { useState } from "react";
import { Navigate } from "react-router";
import AuthService from "../../services/auth.service";
import "./login.css";
import icon from "../../images/icon.png";

import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

export default function Login() {
  const isAuthenticated = useAuth();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isError, setIsError] = useState(false);
  const { setAuthTokens } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 3 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    // validateOnChange: false,
    // validateOnBlur: false,
    onSubmit: async (data) => {
      // console.log(JSON.stringify(data, null, 2));
      // e.preventDefault();
      // toast("Wow so easy !");

      await AuthService.login(data.email, data.password)
        .then((result) => {
          // console.log(result);
          if (result) {
            toast.success("Login Successful !", {
              position: toast.POSITION.TOP_CENTER,
            });
            setAuthTokens(true);
            setLoggedIn(true);
          } else {
            setLoggedIn(true);
          }
          // setRedirect(true);
        })
        .catch((e) => {
          // console.log(e);
          // toast.error("Login Unsuccessful !", {
          //   position: toast.POSITION.TOP_CENTER,
          // });
          setIsError(e);
        });
    },
  });
  // console.log(formik);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  } else if (isAuthenticated.authTokens) {
    return <Navigate to="/" />;
  }

  return (
    <div className="row signin">
      <div className="col-12">
        <h2 className="text-center text-dark">Login Form</h2>
        <div className="card my-3">
          <form
            className="card-body cardbody-color p-lg-5"
            onSubmit={formik.handleSubmit}
          >
            <div className="text-center">
              <img
                src={icon}
                className="img-fluid profile-image-pic img-thumbnail rounded-circle my-3"
                width="200px"
                alt="profile"
              />
            </div>
            {isError ? (
              <div
                className="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                Invalid email/pasword
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setIsError(false)}
                >
                  &times;
                </button>
              </div>
            ) : (
              <div></div>
            )}

            <div className="mb-3">
              <input
                name="email"
                type="email"
                className={
                  "form-control" +
                  (formik.errors.email && formik.touched.email
                    ? " is-invalid"
                    : "")
                }
                id="email"
                placeholder="Email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            <div className="text-danger">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}{" "}
            </div>
            <div className="mb-3">
              <input
                name="password"
                type="password"
                className={
                  "form-control" +
                  (formik.errors.password && formik.touched.password
                    ? " is-invalid"
                    : "")
                }
                id="password"
                placeholder="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
            </div>
            <div className="text-danger">
              {formik.touched.password && formik.errors.password ? (
                <div>{formik.errors.password}</div>
              ) : null}{" "}
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-5 w-100">
                Login
              </button>
            </div>
            <div
              id="emailHelp"
              className="form-text text-center mb-5 text-dark"
            >
              Not Registered?{" "}
              <Link to="/register" className="text-dark fw-bold">
                {" "}
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
