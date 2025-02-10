import React from 'react';
import { useState, useEffect } from 'react';
import apiClient from "../apiClient";

const Settings = ({ isConnected, accessRights }) => {
    document.title = "Login - ComNet";
    if (!isConnected) window.location.replace("/");

    const [message, setMessage] = useState();
    useEffect(() => {
        if (accessRights === "Unverified") setMessage(
            <p className='message error'>Your email has not been verified. <a href='#' className="normal" onClick={sendVerification}>Send verication email</a></p>
        );
    }, []);
    function sendVerification(e) {
        e.preventDefault();
        apiClient.get("/api/user/sendverification", { withCredentials: true })
        .then(res => {
            if (res.data.success == false) throw new Error(res.data.message);
            setMessage(
                <p className='message info'>A validation email has been sent. Please check your emails to validate your email address and activate your account. <a href='#' className="normal" onClick={sendVerification}>Resend verication email</a></p>
            );
        }).catch(err => {
            const message = (err.response) ? err.response.data.message : err.message;
            setMessage(<p className='message error'>Info: {message}. <a href='#' className="normal" onClick={sendVerification}>Resend verication email</a></p>);
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