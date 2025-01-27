import React from 'react';

const Footer = (props) => {
    return (
        <footer className="footer">
            <div className="columns">
                <div className="column">{props.copyrights}</div>
                <div className="column is-pulled-right">
                    {props.socialLinks.map(e => (
                        <a target="_blank" href={e.link} className="navbar-item">
                            {e.name}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}

export default Footer;