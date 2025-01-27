import React from 'react';
import { Link } from 'react-router-dom';

const Header = (props) => {
    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="#">
                    <img src={props.logo} alt={props.logo} />
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    {props.links.map(e => (
                        <Link to={e.link} className="navbar-item">
                            {e.name}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}

export default Header;