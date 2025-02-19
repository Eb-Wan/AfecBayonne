import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Login from "./pages/Login"
import Logout from "./pages/Logout"
import Register from "./pages/Register"

import { useState, useEffect } from "react";
import apiClient from "./axiosConfig";

function App() {
  const [isConnected, setConnected] = useState(false);
  const [isVerified, setVerified] = useState(false);

  useEffect(() => {
    apiClient.get("/api/user/", { withCredentials: true })
    .then(res => {
      console.log(res);
        if (res.data.success === true) {
            setConnected(true);
            setVerified(res.data.user.isverified);
        }
    }).catch(err => {
        if (err.response) {
            if (err.response.status !== 304) console.log(err.message);
        }
        console.log(err);
    });
  }, []);

  return (
    <>
      <Router>
      <Navbar isConnected={isConnected} />
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/contact' element={ <Contact isConnected={isConnected} isVerified={isVerified} /> } />
          <Route path='/login' element={ <Login /> } isConnected={isConnected} />
          <Route path='/logout' element={ <Logout isConnected={isConnected} /> } />
          <Route path='/register' element={ <Register isConnected={isConnected} /> } />
        </Routes>
      </Router>
    </>
  )
}

export default App