import React from 'react';

const ForgotPassword = () => {
    document.title = "Forgot password - ComNet";
    return (
        <>
            <main>
                <div className='window'>
                    <h1>Forgot password</h1>
                    <label htmlFor="email">Enter your Email address</label><input style={{boxSizing: "border-box"}} className="input-normal" type="email" placeholder="emailexample@example.com" required />
                    <button className="button-highlight">Send password reset link</button>
                </div>
                
            </main>
        </>
    );
}

export default ForgotPassword;