import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./home.css";
import AppleService from "../../services/AppleService";
import Print from "../print/Print";
import { useReactToPrint } from "react-to-print";
import ReactPaginate from "react-paginate";
import swal from "sweetalert";

//For loading spinner
import FadeLoader from "react-spinners/FadeLoader";
import { toast } from "react-toastify";

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

  //For paginate
  const [offset, setOffset] = useState(0);
  const [sl, setSl] = useState(0);
  // const [data, setData] = useState([]);
  const [perPage] = useState(5);
  const [pageCount, setPageCount] = useState(0);

  //For print
  const componentRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    // console.log(selectedPage);
    setOffset(selectedPage + 1);
    setSl(selectedPage);
  };

  useEffect(() => {
    // setLoading(true);
    const getAllInvoices = async () => {
      await AppleService.getInvoices()
        .then((response) => {
          // setInvoices(response.data);
          setLoading(false);
          // console.log(response.data);
          //For paginate
          const slice = response.data.slice(offset, offset + perPage);
          // console.log(slice);
          setInvoices(slice);

          // const postData = slice.map((pd) => (
          //   <div key={pd.id}>
          //     <p>{pd.title}</p>
          //     <img src={pd.thumbnailUrl} alt="" />
          //   </div>
          // ));
          // setData(postData);
          setPageCount(Math.ceil(response.data.length / perPage));
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
  }, [offset, perPage]);

  const deleteHandler = (id) => {
    // console.log(id);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        AppleService.deleteInvoice(id);
        const newInvoice = invoices.filter((invoice) => {
          return invoice.id !== id;
        });
        setInvoices(newInvoice);
        toast.success("Invoice deleted Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
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
        <>
          <div className="row">
            <div className="userTitleContainer">
              <h1 className="invoiceTitle">All Invoices</h1>
              <Link to="/create">
                <button className="btn btn-primary">Create New Invoice</button>
              </Link>
            </div>
            <table className="table table-responsive-sm table-bordered table-hover w-100">
              <thead>
                <tr>
                  <th scope="col" className="vcenter">
                    SL
                  </th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Problem</th>
                  <th scope="col" className="vcenter">
                    Quantity
                  </th>
                  <th scope="col" className="vcenter">
                    Total
                  </th>
                  <th scope="col" className="vcenter">
                    Action
                  </th>
                </tr>
              </thead>
              {invoices ? (
                <tbody>
                  {invoices.map((invoice, i) => (
                    <tr key={i}>
                      <td className="vcenter">{sl * perPage + i + 1}</td>
                      <td>{invoice.productName ?? ""}</td>
                      <td>{invoice.productProblem ?? ""}</td>
                      <td className="vcenter">{invoice.productQty ?? ""}</td>
                      <td className="vcenter">{invoice.total ?? ""}</td>
                      <td className="vcenter contents">
                        <Link
                          to={"/viewInvoice/" + invoice.id}
                          className="mr-2 home-btn"
                        >
                          <FontAwesomeIcon
                            icon={faInfoCircle}
                            size="lg"
                            className="highlight"
                          />
                        </Link>
                        <Link
                          to={"/editInvoice/" + invoice.id}
                          className="mr-2 home-btn"
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

                        <button className="btn home-btn" onClick={handlePrint}>
                          <FontAwesomeIcon
                            icon={faPrint}
                            size="lg"
                            className="highlight"
                          />
                        </button>

                        <button
                          type="button"
                          className="btn home-btn"
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
            </table>{" "}
            <div className="row">
              <div className="col-12 right">
                <ReactPaginate
                  previousLabel={"<<"}
                  nextLabel={">>"}
                  breakLabel={"..."}
                  breakClassName={"break-me"}
                  pageCount={pageCount}
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  subContainerClassName={"pages pagination"}
                  activeClassName={"active"}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
