import React from 'react';
import apiClient from "../apiClient";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({ isConnected }) => {
    document.title = "Login - ComNet";
    if (isConnected) window.location.replace("/");
    const [message, setMessage] = useState();
    function login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
            name: formData.get("name"),
            password: formData.get("password")
        }
        apiClient.post("/api/user/auth", body)
        .then(res => {
            document.cookie = `comNetToken=${res.data.token}; expires=${new Date(Date.now() + 86400e3).toUTCString()}`
            window.location.replace("/");

        }).catch(err => {
            const message = (err.response) ? err.response.data.message : err.message;
            setMessage(<p className='message error'>Info: {message}</p>);
        });
    }
    return (
        <main>
            <div className="window">
                <h1>Login</h1>
                <p className='text-medium'>Welcome back</p>
                <form onSubmit={login}>
                    <div className="form-field">{message}</div>
                    <div className="form-field"><label htmlFor="name">Username or email</label><input id="name" name="name" type="text" className="input-normal" placeholder="example@email.com"/></div>
                    <div className="form-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" className="input-normal" placeholder="Passord"/></div>
                    <div className="form-field"><button className="button-highlight" type="submit">Login</button></div>
                    <div className="form-field flex-row center-elements"><Link to="/forgot-password">Forgot password</Link></div>
                </form>
            </div>
        </main>
    );
}

export default Login;