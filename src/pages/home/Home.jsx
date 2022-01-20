import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import AppleService from "../../services/AppleService";
import Print from "../print/Print";
import { useReactToPrint } from "react-to-print";

//For loading spinner
import FadeLoader from "react-spinners/FadeLoader";

//For Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faPrint,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [invoices, setInvoices] = useState();
  let [loading, setLoading] = useState(true);

  //For print
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    // setLoading(true);
    const getAllInvoices = async () => {
      await AppleService.getInvoices()
        .then((respose) => {
          setInvoices(respose.data);
          setLoading(false);
          // console.log(respose.data);
        })
        .catch((e) => {
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
          // console.log(e);
        });
    };
    getAllInvoices();
    // console.log(invoices);
  }, []);

  const deleteHandler = async (id) => {
    // console.log(id);
    await AppleService.deleteInvoice(id);
    const newInvoice = invoices.filter((invoice) => {
      return invoice.id !== id;
    });
    setInvoices(newInvoice);
  };
  // const deleteHandle = (id) => {
  //   console.log("delete button clicked");
  //   props.deleteHandler(id);
  // };

  return (
    <div className="home">
      {loading ? (
        <div className="spinner">
          <FadeLoader color={"#4A90E2"} loading={loading} size={150} />
        </div>
      ) : (
        <div className="row">
          <div className="userTitleContainer">
            <h1 className="invoiceTitle">All Invoices</h1>
            <Link to="/create">
              <button className="btn btn-primary">Create New Invoice</button>
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">SL</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Problem</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th scope="col" width="220px">
                    Action
                  </th>
                </tr>
              </thead>
              {invoices ? (
                <tbody>
                  {invoices.map((invoice, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{invoice.product_name ?? ""}</td>
                      <td>{invoice.product_problem ?? ""}</td>
                      <td>{invoice.product_qty ?? ""}</td>
                      <td>{invoice.total ?? ""}</td>
                      <td className="flex">
                        <Link
                          to={"/viewInvoice/" + invoice.id}
                          className="mr-2"
                        >
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="lg"
                            className="highlight"
                          />
                        </Link>
                        <Link
                          to={"/editInvoice/" + invoice.id}
                          className="mr-2"
                        >
                          <FontAwesomeIcon
                            icon={faEdit}
                            size="lg"
                            className="highlight"
                          />{" "}
                        </Link>
                        <div style={{ display: "none" }}>
                          <Print ref={componentRef} id={invoice.id} />
                        </div>

                        <button className="btn" onClick={handlePrint}>
                          <FontAwesomeIcon
                            icon={faPrint}
                            size="lg"
                            className="highlight"
                          />
                        </button>

                        <button
                          type="button"
                          className="btn"
                          onClick={() => deleteHandler(invoice.id)}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            size="lg"
                            color="red"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="6">
                      <strong>No Data Found</strong>
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
