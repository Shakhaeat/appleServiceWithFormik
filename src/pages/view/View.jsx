import React, { useEffect, useState, useRef } from "react";
import logo from "../../images/logo.png";
import "./view.css";
import AppleService from "../../services/AppleService";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

//For loading spinner
import FadeLoader from "react-spinners/FadeLoader";
import Print from "../print/Print";

const View = () => {
  let [loading, setLoading] = useState(true);
  const componentRef = useRef(null);

  var today = new Date(),
    date =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();

  const initialState = {
    customer_name: "",
    phone_no: "",
    product_name: "",
    product_problem: "",
    address: "",
    product_qty: "",
    total: "",
    advance: "",
    due: "",
  };
  const [invoice, setInvoice] = useState(initialState);
  const { id } = useParams();

  // console.log(id);
  const getInvoice = async (id) => {
    await AppleService.getInvoice(id)
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
        // console.log(invoice);
      })
      .catch((e) => {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        // console.log(e);
      });
  };
  useEffect(() => {
    getInvoice(id);
  }, [id]);

  //For print

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="home">
      {loading ? (
        <div className="spinner">
          <FadeLoader color={"#4A90E2"} loading={loading} size={150} />
        </div>
      ) : (
        <div className="card">
          <div className="card-header">View Invoice</div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-4 logo">
                <img alt="Invioce Template" src={logo} />
              </div>
              <div className="col-4">
                <span className="badge bg-secondary">Customer Copy</span>
              </div>
              <div className="col-4">
                House No. 17, Road No.2 <br /> Block-A, Priyanka Housing <br />
                Mirpur-1, Dhaka-1216
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <label htmlFor="sl">
                  SL:<strong> #{id}</strong>
                </label>
              </div>
              <div className="col-4">
                <label htmlFor="date">
                  Date:<strong> {date}</strong>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <label> Name:</label>
                <span className="value-control">
                  {invoice.customer_name ?? ""}
                </span>
              </div>
              <div className="col-4">
                <label>Cell: </label>
                <span className="value-control">{invoice.phone_no ?? ""}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>Address:</label>
                <span className="value-control">{invoice.address ?? ""}</span>
              </div>
            </div>

            <div className="row">
              <div className="col-5 mt-3">
                <div className="bg-secondary text-white text-center">
                  <label>Product </label>
                </div>
                <div className="mt-1">
                  <sapn className="value-control-area">
                    {invoice.product_name ?? ""}
                  </sapn>
                </div>
              </div>

              <div className="col-7 mt-3 text-center">
                <div className="bg-secondary text-white">
                  <label>Problem </label>
                </div>
                <div className="mt-1">
                  <sapn className="value-control-area">
                    {invoice.product_problem ?? ""}
                  </sapn>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5 col-sm-5">
                <label>Qty </label>
                <span className="control-value">
                  {invoice.product_qty ?? ""}
                </span>
              </div>

              <div className="col-4 col-sm-5">
                <div className="form-group">
                  <label>Total </label>
                  <span className="control-value">{invoice.total ?? ""}</span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <label>Advance </label>
                <span className="control-value">{invoice.advance ?? ""}</span>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label>Due </label>
                <span className="control-value">{invoice.due ?? ""}</span>
              </div>
            </div>
            <div style={{ display: "none" }}>
              <Print ref={componentRef} id={id} />
            </div>

            <button className="btn btn-info" onClick={handlePrint}>
              Print{" "}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
