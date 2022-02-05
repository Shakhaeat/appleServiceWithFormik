import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/login/Login";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Create from "./pages/create/Create";
import View from "./pages/view/View";
// import Edit from "./pages/edit/Edit";
import AuthService from "./services/auth.service";
import NotFound from "./pages/notFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import { AuthContext } from "./context/authContext";
import user from "./services/auth.service";

//For notification using react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import Print from "./pages/print/Print";

function App() {
  const [authTokens, setAuthTokens] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [currentUser, setCurrentUser] = useState("");

  const setTokens = () => {
    // localStorage.setItem("tokens", JSON.stringify(data));
    // setAuthTokens(data);
    const authUser = user.getUser();
    if (authUser) {
      setAuthTokens(authUser);
      setCurrentUser(authUser.user);
    }
    // console.log(authTokens);
  };

  // const setTokens = (data) => {
  //   // localStorage.setItem("user", JSON.stringify(data));
  //   setAuthTokens(data);
  // };

  // useEffect(() => {
  //   const tokens = AuthService.getTokens();

  //   // console.log(user);

  //   if (tokens) {
  //     setAuthTokens(tokens);
  //   }
  // }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Navbar currentUser={currentUser} logout={logout} />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<PrivateRoute />}>
              <Route exact path="/" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/viewInvoice/:id" element={<View />} />
              <Route path="/editInvoice/:id" element={<Create />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>

      <ToastContainer autoClose={1000} />
    </AuthContext.Provider>
  );
}

export default App;
