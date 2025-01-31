import React from 'react';

const Chat = ({ isConnected }) => {
    document.title = "Chat - ComNet";
    if (!isConnected) window.location.replace("/");
    return (
        <h1>Chat</h1>
    )
}

export default Chat;