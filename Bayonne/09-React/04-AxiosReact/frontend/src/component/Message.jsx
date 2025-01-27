import React from 'react';

const message = (props) => {
    return (
        <article className={"message " + props.type}>
        <div className="message-header">
            <p>{props.title}</p>
        </div>
        <div className="message-body">
            {props.message}
        </div>
        </article>
    )
}

export default message;