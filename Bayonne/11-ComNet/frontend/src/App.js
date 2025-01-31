import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Terms from "./pages/Terms";
import ForgotPassword from "./pages/ForgotPassword";


function App() {
    
    const [isConnected, setConnected] = useState(false);
    useEffect(() => {
        if (!document.cookie) return;
        axios.get("http://localhost:4000/api/user/", { withCredentials: true })
        .then(res => {
            if (res.data.success === true) setConnected(true);
        }).catch(err => {
            if (err.response) {
                if (err.response.status !== 304) console.log(err.message);
            }
        });
    }, []);
    return (
        <>
        <Router>
            
            <Header isConnected={isConnected}/>
            <Routes>
                <Route path="/" element={<Home isConnected={isConnected} />}></Route>
                <Route path="/chat" element={<Chat isConnected={isConnected} />}></Route>
                <Route path="/settings" element={<Settings isConnected={isConnected} />}></Route>
                <Route path="/login" element={<Login isConnected={isConnected} />}></Route>
                <Route path="/register" element={<Register isConnected={isConnected} />}></Route>
                <Route path="/logout" element={<Logout isConnected={isConnected} />}></Route>
                <Route path="/terms" element={<Terms />}></Route>
                <Route path="/forgot-password" element={<ForgotPassword />}></Route>
                <Route path="*" element={<PageNotFound />}></Route>
            </Routes>
            
            <Footer/>
        </Router>
        </>
    );
}

export default App;
