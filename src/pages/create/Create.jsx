import React, { useState } from "react";
import logo from "../../images/logo.png";
import "./create.css";
import AppleService from "../../services/AppleService";
import { Navigate } from "react-router-dom";

export default function Create() {
  const [name, setName] = useState("");
  const [cellNO, setCellNO] = useState("");
  const [address, setAddress] = useState("");
  const [product, setProduct] = useState("");
  const [problem, setProblem] = useState("");
  const [advance, setAdvance] = useState(0);
  const [total, setTotal] = useState(0);
  const [qty, setQty] = useState(0);
  const [due, setDue] = useState(0);
  const [redirect, setRedirect] = useState(false);
  console.log(name);

  //For Submit all value
  const submit = async (e) => {
    e.preventDefault();
    var data = {
      customer_name: name,
      phone_no: cellNO,
      address: address,
      product_name: product,
      product_problem: problem,
      product_qty: qty,
      advance: advance,
      total: total,
      due: due,
    };
    AppleService.createInvoice(data)
      .then((response) => {
        // console.log(response.data);
        setRedirect(true);
      })
      .catch((e) => {
        console.log(`Error: ${e.message}`);
      });
    // console.log(data);
  };
  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="container-fluid">
      <div id="ui-view">
        <div className="card">
          <div className="card-header">New Invoice</div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-md-4 logo">
                <img alt="Invioce Template" src={logo} />
              </div>

              <form onSubmit={submit}>
                <div className="row">
                  <label htmlFor="sl">
                    SL:<strong> #000</strong>
                  </label>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Name: </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Cell Number: </label>
                    <input
                      type="number"
                      className="form-control"
                      id="cellNo"
                      placeholder="Cell No."
                      onChange={(e) => setCellNO(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <label>Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 mt-3">
                    <div className="bg-secondary text-white text-center">
                      <label>Product </label>
                    </div>
                    <div className="mt-1">
                      <textarea
                        type="textarea"
                        className="form-control"
                        id="product"
                        placeholder="Product"
                        onChange={(e) => setProduct(e.target.value)}
                      ></textarea>
                    </div>
                  </div>

                  <div className="col-md-7 mt-3 text-center">
                    <div className="bg-secondary text-white">
                      <label>Problem </label>
                    </div>
                    <div className="mt-1">
                      <textarea
                        type="textarea"
                        className="form-control"
                        id="problem"
                        placeholder="Problem"
                        onChange={(e) => setProblem(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-8 col-sm-5">
                    <label>Qty </label>
                    <input
                      type="number"
                      min="0"
                      className="form-control w-50 col-sm-5"
                      name="qty"
                      placeholder="Qty"
                      onChange={(e) => setQty(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 col-sm-5">
                    <div className="form-group">
                      <label>Total </label>
                      <input
                        type="number"
                        className="form-control"
                        name="total"
                        placeholder="Total"
                        min="0"
                        onChange={(e) => setTotal(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="float-right">
                  <label>Advance </label>
                  <input
                    type="number"
                    className="form-control  w-50"
                    placeholder="Advance"
                    min="0"
                    onChange={(e) => setAdvance(e.target.value)}
                  />
                </div>
                <div className="float-right">
                  <label>Due </label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Due"
                    min="0"
                    onChange={(e) => setDue(e.target.value)}
                  />
                </div>
                <div className="center">
                  <button className="btn btn-primary mt-2" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
