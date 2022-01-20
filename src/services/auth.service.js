import axios from "axios";
const API_URL = "http://127.0.0.1:8000/api/auth/";

const login = (email, password) => {
  return axios.post(API_URL + "login", { email, password }).then((response) => {
    if (response.data.access_token) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (name, email, password, password_confirmation) => {
  return axios.post(API_URL + "register", {
    name,
    email,
    password,
    password_confirmation,
  });
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const exportedObject = {
  register,
  login,
  logout,
  getUser,
};

export default exportedObject;
