import http from "../http-common";
import authHeader from "./auth-header";
//Get all invoics
const getInvoices = () => {
  // console.log(authHeader);
  return http.get("invoices", { headers: authHeader() });
};
//Get single invoice by id
const getInvoice = (id) => {
  return http.get(`invoice/${id}`, { headers: authHeader() });
  // return http.get(`/tutorials/${id}`);
};
//For create invoice
const createInvoice = (data) => {
  return http.post("invoices", data, { headers: authHeader() });
};
//For update invoice
const updateInvoice = (id, data) => {
  return http.put(`/invoice/${id}`, data, { headers: authHeader() });
};

//For delete invoice
const deleteInvoice = (id) => {
  return http.delete(`/invoice/${id}`, { headers: authHeader() });
};

const exportedObject = {
  getInvoices,
  createInvoice,
  getInvoice,
  updateInvoice,
  deleteInvoice,
};
export default exportedObject;
