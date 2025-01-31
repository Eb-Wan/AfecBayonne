import React from 'react';
import Menu from "../partials/Menu";
import { Link, useLocation } from 'react-router-dom';

const Header = ({ isConnected }) => {
    const { pathname } = useLocation();
    return (
        <header>
            <div>
                <img className="image-logo" src="assets/logo.webp" alt="logo" />
                <Link to="/" className="text-large button-header">ComNet</Link>
            </div>
            <div className="mobile">
                <Menu contents={
                    isConnected ? <>
                    <Link to="/chat" className="button-highlight">Chat</Link>
                    <Link to="/settings" className="button-highlight">Settings</Link>
                    <Link to="/logout" className="button-highlight">Logout</Link>
                    </>:<>
                        <Link to="/login" className="button-highlight text-medium">Login</Link>
                        <Link to="/register" className="button-highlight text-medium">Register</Link>
                    </>
                }/>
            </div>
            <div className="desktop">
                <div className="flex-row">
                    {
                        isConnected ? <>
                            <Link to="/chat" className={(pathname === "/chat" ? "active " : "") + "button-header"}>Chat</Link>
                            <Link to="/settings" className={(pathname === "/settings" ? "active " : "") + "button-header"}>Settings</Link>
                            <Link to="/logout" className="button-header">Logout</Link>
                        </>:<>
                            <Link to="/login" className={(pathname === "/login" ? "active " : "") + "button-header text-medium"}>Login</Link>
                            <Link to="/register" className={(pathname === "/register" ? "active " : "") + "button-header text-medium"}>Register</Link>
                        </>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header