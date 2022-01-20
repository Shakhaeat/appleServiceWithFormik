import React, { Component } from "react";
import logo from "../../images/logo.png";
import "./print.css";
import AppleService from "../../services/AppleService";

export default class Print extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      date:
        new Date().getDate() +
        "/" +
        (new Date().getMonth() + 1) +
        "/" +
        new Date().getFullYear(),
      invoice: [],
    };
  }
  componentDidMount() {
    this.getInvoice(this.state.id);
  }

  getInvoice = async (id) => {
    await AppleService.getInvoice(id)
      .then((response) => {
        this.setState({
          invoice: response.data,
        });
        // console.log(response.data);
        // console.log(invoice);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    return (
      <div className="home">
        <div className="card">
          <div className="card-header">Invoice</div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-4 logo">
                <img alt="Invioce Template" src={logo} />
              </div>
              <div className="col-4">
                <span is="x3d" className="badge bg-secondary">
                  Customer Copy
                </span>
              </div>
              <div className="col-4">
                House No. 17, Road No.2 <br /> Block-A, Priyanka Housing <br />
                Mirpur-1, Dhaka-1216
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <label htmlFor="sl">
                  SL:<strong> #{this.state.id}</strong>
                </label>
              </div>
              <div className="col-4">
                <label htmlFor="date">
                  Date:<strong> {this.state.date}</strong>
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-8">
                <label> Name:</label>
                <span is="x3d" className="value-control">
                  {this.state.invoice.customer_name ?? ""}
                </span>
              </div>
              <div className="col-4">
                <label>Cell: </label>
                <span is="x3d" className="value-control">
                  {this.state.invoice.phone_no ?? ""}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <label>Address:</label>
                <span is="x3d" className="value-control">
                  {this.state.invoice.address ?? ""}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="col-5 mt-3">
                <div className="bg-secondary text-white text-center">
                  <label>Product </label>
                </div>
                <div className="mt-1">
                  <sapn is="x3d" className="value-control-area">
                    {this.state.invoice.product_name ?? ""}
                  </sapn>
                </div>
              </div>

              <div className="col-7 mt-3 text-center">
                <div className="bg-secondary text-white">
                  <label>Problem </label>
                </div>
                <div className="mt-1">
                  <sapn is="x3d" className="value-control-area">
                    {this.state.invoice.product_problem ?? ""}
                  </sapn>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5 col-sm-5">
                <label>Qty </label>
                <span is="x3d" className="control-value">
                  {this.state.invoice.product_qty ?? ""}
                </span>
              </div>

              <div className="col-4 col-sm-5">
                <div className="form-group">
                  <label>Total </label>
                  <span is="x3d" className="control-value">
                    {this.state.invoice.total ?? ""}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-5">
                <label>Advance </label>
                <span is="x3d" className="control-value">
                  {this.state.invoice.advance ?? ""}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-5">
                <label>Due </label>
                <span is="x3d" className="control-value">
                  {this.state.invoice.due ?? ""}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
