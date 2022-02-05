import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import "./create.css";
import AppleService from "../../services/AppleService";
import { Navigate, useParams } from "react-router-dom";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { toast } from "react-toastify";

export default function Create() {
  // const [name, setName] = useState("");
  // const [cellNO, setCellNO] = useState("");
  // const [address, setAddress] = useState("");
  // const [product, setProduct] = useState("");
  // const [problem, setProblem] = useState("");
  // const [advance, setAdvance] = useState(0);
  // const [total, setTotal] = useState(0);
  // const [qty, setQty] = useState(0);
  // const [due, setDue] = useState(0);
  const [redirect, setRedirect] = useState(false);
  // const [invoice, setInvoice] = useState();

  // console.log(name);
  const { id } = useParams();
  const isAddMode = !id;
  const initialValues = {
    customerName: "",
    phoneNo: "",
    address: "",
    productName: "",
    productProblem: "",
    productQty: "",
    advance: "",
    total: "",
    due: "",
  };

  function onSubmit(fields, { setStatus, setSubmitting }) {
    setStatus();
    if (isAddMode) {
      // console.log(fields);
      createUser(fields, setSubmitting);
    } else {
      updateUser(id, fields, setSubmitting);
    }
  }

  async function createUser(values, setSubmitting) {
    // console.log("dkjfk");
    var data = {
      customerName: values.customerName,
      phoneNo: values.phoneNo,
      address: values.address,
      productName: values.productName,
      productProblem: values.productProblem,
      productQty: values.productQty,
      advance: values.advance,
      total: values.total,
      due: values.due,
    };
    await AppleService.createInvoice(data)
      .then((result) => {
        // console.log(result);

        toast.success("Invoice created Successful !", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRedirect(true);

        // setRedirect(true);
      })
      .catch((e) => {
        // console.log(e);
        toast.error("Invoice create Unsuccessful !", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  async function updateUser(id, values, setSubmitting) {
    var data = {
      customerName: values.customerName,
      phoneNo: values.phoneNo,
      address: values.address,
      productName: values.productName,
      productProblem: values.productProblem,
      productQty: values.productQty,
      advance: values.advance,
      total: values.total,
      due: values.due,
    };
    await AppleService.updateInvoice(id, data)
      .then((result) => {
        // console.log(result);

        toast.success("Invoice updated Successful !", {
          position: toast.POSITION.TOP_CENTER,
        });
        setRedirect(true);

        // setRedirect(true);
      })
      .catch((e) => {
        // console.log(e);
        toast.error("Invoice update Unsuccessful !", {
          position: toast.POSITION.TOP_CENTER,
        });
      });
  }

  const validationSchema = Yup.object().shape({
    customerName: Yup.string().required("Name is required"),
    phoneNo: Yup.string().required("Cell Number is required"),
    address: Yup.string().required("Address is required"),
    productName: Yup.string().required("Product name is required"),
    productProblem: Yup.string().required("Product problem is required"),
    total: Yup.string().required("Total field is required"),
    productQty: Yup.string().required("Product Quantity field is required"),
  });

  //For Submit all value
  // const submit = async (e) => {
  //   e.preventDefault();
  //   var data = {
  //     customer_name: name,
  //     phone_no: cellNO,
  //     address: address,
  //     product_name: product,
  //     product_problem: problem,
  //     product_qty: qty,
  //     advance: advance,
  //     total: total,
  //     due: due,
  //   };
  //   await AppleService.createInvoice(data)
  //     .then((response) => {
  //       // console.log(response.data);
  //       setRedirect(true);
  //     })
  //     .catch((e) => {
  //       console.log(`Error: ${e.message}`);
  //     });
  //   // console.log(data);
  // };
  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {function ShowForm({
        values,
        errors,
        touched,
        isSubmitting,
        setFieldValue,
      }) {
        // const [user, setUser] = useState({});
        // const [showPassword, setShowPassword] = useState(false);

        useEffect(() => {
          if (!isAddMode) {
            // get user and set form fields
            AppleService.getInvoice(id).then((response) => {
              const data = response.data;

              // console.log(data);
              const fields = [
                "customerName",
                "phoneNo",
                "address",
                "productName",
                "productProblem",
                "productQty",
                "total",
                "advance",
                "due",
              ];
              fields.forEach((field) =>
                setFieldValue(field, data[field], false)
              );
              // setUser(user);
            });
          }
        }, [setFieldValue]);

        return (
          <div className="container-fluid">
            <div id="ui-view">
              <div className="card">
                <div className="card-header">
                  {isAddMode ? "New Invoice" : "Edit Invoice"}
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-4 logo">
                      <img alt="Invioce Template" src={logo} />
                    </div>

                    <Form>
                      <div className="row">
                        <label htmlFor="sl">
                          SL:<strong> #000</strong>
                        </label>
                      </div>
                      <div className="row">
                        <div className="col-6">
                          <label>Name: </label>
                          <Field
                            name="customerName"
                            placeholder="Customer Name"
                            type="text"
                            className={
                              "form-control" +
                              (errors.customerName && touched.customerName
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="customerName"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                        <div className="col-6">
                          <label>Cell Number: </label>
                          <Field
                            name="phoneNo"
                            placeholder="Cell Number"
                            type="text"
                            className={
                              "form-control" +
                              (errors.phoneNo && touched.phoneNo
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="phoneNo"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <label>Address</label>
                          <Field
                            name="address"
                            type="text"
                            placeholder="Address"
                            className={
                              "form-control" +
                              (errors.address && touched.address
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="address"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-5 mt-3">
                          <div className="bg-secondary text-white text-center">
                            <label>Product </label>
                          </div>
                          <div className="mt-1">
                            <Field
                              name="productName"
                              placeholder="Product Name"
                              component="textarea"
                              type="text"
                              className={
                                "form-control" +
                                (errors.productName && touched.productName
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="productName"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>

                        <div className="col-7 mt-3">
                          <div className="bg-secondary text-white text-center">
                            <label>Problem </label>
                          </div>
                          <div className="mt-1">
                            <Field
                              name="productProblem"
                              placeholder="Product Problem"
                              component="textarea"
                              type="text"
                              className={
                                "form-control" +
                                (errors.productProblem && touched.productProblem
                                  ? " is-invalid"
                                  : "")
                              }
                            />
                            <ErrorMessage
                              name="productProblem"
                              component="div"
                              className="invalid-feedback"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-5 col-sm-5">
                          <label>Qty </label>
                          <Field
                            name="productQty"
                            placeholder="Product Quantity"
                            type="number"
                            className={
                              "form-control" +
                              (errors.productQty && touched.productQty
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="productQty"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>

                        <div className="col-4 col-sm-5">
                          <label>Total </label>
                          <Field
                            name="total"
                            placeholder="Total"
                            type="number"
                            className={
                              "form-control" +
                              (errors.total && touched.total
                                ? " is-invalid"
                                : "")
                            }
                          />
                          <ErrorMessage
                            name="total"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-5">
                          <label>Advance </label>
                          <Field
                            name="advance"
                            placeholder="Advance"
                            type="number"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-5">
                          <label>Due </label>
                          <Field
                            name="due"
                            placeholder="Due"
                            type="Number"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="center">
                        <button className="btn btn-primary mt-2" type="submit">
                          Submit
                        </button>
                      </div>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}
