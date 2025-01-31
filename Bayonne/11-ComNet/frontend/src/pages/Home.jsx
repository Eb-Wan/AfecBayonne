import React from 'react';
import { Link } from "react-router-dom";


const Home = ({ isConnected }) => {
    document.title = "Home - ComNet";
    return (
        <>
            <main className="center-elements">
            <div className="page">
                <div className="float-left">
                    <h1>Welcome</h1>
                    <p className='message info'>Info: ComNet just opened, be aware that it is in a test phase.</p>
                    <p>ComNet is a free instant messaging web app, that doesn't collect your data.</p>
                    <img className="image-centered" src="assets/logo.webp" width="50%" alt="ComNet Logo" />
                </div>
                <div className="float-right flex-column center-elements">
                    {isConnected ? 
                        <>
                            <Link to="/chat" className="button-highlight">Chat</Link>
                            <Link to="/settings" className="button-normal">Settings</Link>
                            <Link to="/logout" className="button-normal">Logout</Link>
                        </> : <>
                            <Link to="/login" className="button-highlight">Login</Link>
                            <Link to="/register" className="button-normal">Register</Link>
                        </>
                    }
                </div>
            </div>
            </main>
        </>
    );
}

export default Home;