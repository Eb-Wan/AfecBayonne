import React from 'react';
import apiClient from "../apiClient";
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = ({ isConnected }) => {
    document.title = "Register - ComNet";
    if (isConnected) window.location.replace("/");
    const [message, setMessage] = useState();
    function login(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (!formData.get("agree")) {
            setMessage(<p className='message error'>You must agree to the terms & conditions to create an account.</p>);
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            return;
        }
        const body = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password"),
            passMatch: formData.get("passMatch")
        }
        apiClient.post("/api/user/register", body)
        .then(res => {
            document.cookie = `comNetToken=${res.data.token}; expires=${new Date(Date.now() + 86400e3).toUTCString()}`
            window.location.replace("/");

        }).catch(err => {
            const message = (err.response) ? err.response.data.message : err.message;
            window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
            setMessage(<p className='message error'>Info: {message}</p>);
        });
    }
    return (
        <main>
            <div className="window">
                <h1>Register</h1>
                <p className='text-medium'>Welcome to ComNet</p>
                <form onSubmit={login}>
                    <div className="form-field">{message}</div>
                    <div className="form-field"><label htmlFor="name">Username</label><input id="name" name="name" type="text" className="input-normal" placeholder="Username" required/></div>
                    <div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" className="input-normal" placeholder="emailexample@example.com" required/></div>
                    <div className="form-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" className="input-normal" placeholder="Passord"/></div>
                    <div className="form-field"><label htmlFor="passMatch">Repeat password</label><input id="passMatch" name="passMatch" type="password" className="input-normal" placeholder="Repeat password" required/></div>
                    <div className="flex-column center-elements" style={{padding: "20px"}}><label htmlFor="agree">I have read and agree to <Link to="/terms" target="_blank">the terms & conditions.</Link></label><input id="agree" name="agree" type="checkbox" className="input-small" /></div>
                    <div className="form-field"><button className="button-highlight" type="submit">Login</button></div>
                </form>
            </div>
        </main>
    );
}

export default Register;