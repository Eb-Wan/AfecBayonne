import React from 'react';
import { useState } from 'react';
const axios = require("axios");

const Settings = ({ isConnected, accessRights }) => {
    document.title = "Login - ComNet";
    if (isConnected) window.location.replace("/");
    const [message, setMessage] = useState();
    if (accessRights === "Unverified") setMessage(<p className='message error'>Your email has not been verified. <a href='#' onClick={sendVerification}>Send verication email</a></p>);
    function sendVerification(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const body = {
            name: formData.get("name"),
            password: formData.get("password")
        }
        axios.post(process.env.BACKEND_DOMAIN+"/api/user/auth", body)
        .then(res => {
            document.cookie = `comNetToken=${res.data.token}; expires=${new Date(Date.now() + 86400e3).toUTCString()}`
            window.location.replace("/");

        }).catch(err => {
            const message = (err.response) ? err.response.data.message : err.message;
            setMessage(<p className='message error'>Info: {message}. <a href='#' onClick={sendVerification}>Resend verication email</a></p>);
        });
    }
    return (
        <main>
            <div className="window">
                <h1>Settings</h1>
                { message }
            </div>
        </main>
    );
}

export default Settings;