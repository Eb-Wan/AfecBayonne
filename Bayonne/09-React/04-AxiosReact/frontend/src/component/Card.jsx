import React from 'react'

const Card = (props) => {
    return (
        <div className="card">
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">{props.title}</p>
                    <button class="card-header-icon" aria-label="more options">
                    <span class="icon">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
                </header>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-left"><img src="https://bulma.io/assets/images/placeholders/96x96.png" alt="Placeholder image" /></div>
                    <div className="media-content">
                        <p className="title is-4">{props.name}</p>
                        <p className="subtitle is-6">{props.company}</p>
                    </div>
                </div>
                <div className="content">
                    {props.topContents}<br/>{props.bottomContents}
                </div>
                
            </div>
        </div>
    )
}

export default Card