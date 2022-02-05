import React, { useState } from "react";
import AuthService from "../../services/auth.service";
import { Navigate } from "react-router-dom";
import "./register.css";
import { useAuth } from "../../context/authContext";

import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Register() {
  const [redirect, setRedirect] = useState(false);
  const isAuthenticated = useAuth();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Fullname is required"),

    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(3, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (data) => {
      // console.log(JSON.stringify(data, null, 2));
      // alert("jhfgh");
      await AuthService.register(
        data.name,
        data.email,
        data.password,
        data.confirmPassword
      )
        .then((response) => {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER,
          });
          console.log(response);
          setRedirect(true);
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  if (redirect) {
    return <Navigate to="/login" />;
  } else if (isAuthenticated.authTokens) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-form">
      <h2 className="text-center text-dark">Registration Form</h2>

      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            type="text"
            className={
              "form-control" +
              (formik.errors.name && formik.touched.name ? " is-invalid" : "")
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <div className="text-danger">
            {formik.touched.name && formik.errors.name ? (
              <div>{formik.errors.name}</div>
            ) : null}{" "}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="email"> Email </label>
          <input
            name="email"
            type="email"
            className={
              "form-control" +
              (formik.errors.email && formik.touched.email ? " is-invalid" : "")
            }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          <div className="text-danger">
            {formik.touched.email && formik.errors.email ? (
              <div>{formik.errors.email}</div>
            ) : null}{" "}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password"> Password </label>
          <input
            name="password"
            type="password"
            className={
              "form-control" +
              (formik.errors.password && formik.touched.password
                ? " is-invalid"
                : "")
            }
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <div className="text-danger">
            {formik.touched.password && formik.errors.password ? (
              <div>{formik.errors.password}</div>
            ) : null}{" "}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword"> Confirm Password </label>
          <input
            name="confirmPassword"
            type="password"
            className={
              "form-control" +
              (formik.errors.confirmPassword && formik.touched.confirmPassword
                ? " is-invalid"
                : "")
            }
            onChange={formik.handleChange}
            value={formik.values.confirmPassword}
          />
          <div className="text-danger">
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div>{formik.errors.confirmPassword}</div>
            ) : null}{" "}
          </div>
        </div>

        <div className="form-group mt-3">
          <button type="submit" className="btn btn-primary">
            Register
          </button>
          <button
            type="button"
            className="btn btn-warning float-right"
            onClick={formik.handleReset}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
