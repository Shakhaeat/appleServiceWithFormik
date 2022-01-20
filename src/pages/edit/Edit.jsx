import React, { useState, useEffect } from "react";
import logo from "../../images/logo.png";
import "./edit.css";
import AppleService from "../../services/AppleService";
import { Navigate, useParams } from "react-router-dom";

const Edit = () => {
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
  const [redirect, setRedirect] = useState(false);

  const [invoice, setInvoice] = useState(initialState);
  const { id } = useParams();

  const getInvoice = (id) => {
    AppleService.getInvoice(id).then((respose) => {
      setInvoice(respose.data);
      // console.log(invoice);
    });
  };

  useEffect(() => {
    getInvoice(id);
  }, [id]);

  const handleInputChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  //For update all value
  const update = async (e) => {
    e.preventDefault();
    var data = {
      customer_name: invoice.customer_name,
      phone_no: invoice.phone_no,
      address: invoice.address,
      product_name: invoice.product_name,
      product_problem: invoice.product_problem,
      product_qty: invoice.product_qty,
      advance: invoice.advance,
      total: invoice.total,
      due: invoice.due,
    };
    console.log(data);
    await AppleService.updateInvoice(id, data)
      .then((response) => {
        console.log(response.data);
        setRedirect(true);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(data);
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

              <form onSubmit={update}>
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
                      id="customer_name"
                      placeholder="Customer Name"
                      name="customer_name"
                      onChange={handleInputChange}
                      value={invoice.customer_name ?? ""}
                    />
                  </div>
                  <div className="col-md-6">
                    <label>Cell Number: </label>
                    <input
                      type="number"
                      className="form-control"
                      id="phone_no"
                      name="phone_no"
                      placeholder="Cell No."
                      value={invoice.phone_no ?? ""}
                      onChange={handleInputChange}
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
                      name="address"
                      value={invoice.address ?? ""}
                      onChange={handleInputChange}
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
                        name="product_name"
                        value={invoice.product_name ?? ""}
                        onChange={handleInputChange}
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
                        name="product_problem"
                        placeholder="Problem"
                        value={invoice.product_problem ?? ""}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-5 col-sm-5">
                    <label>Qty </label>
                    <input
                      type="number"
                      min="0"
                      className="form-control col-sm-5"
                      name="product_qty"
                      placeholder="Qty"
                      value={invoice.product_qty ?? ""}
                      onChange={handleInputChange}
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
                        value={invoice.total ?? ""}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <label>Advance </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Advance"
                      min="0"
                      name="advance"
                      value={invoice.advance ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-5">
                    <label>Due </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Due"
                      min="0"
                      name="due"
                      value={invoice.due ?? ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="center">
                  <button className="btn btn-primary mt-2" type="submit">
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
