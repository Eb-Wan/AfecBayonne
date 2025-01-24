import React from 'react';
import { Link } from 'react-router-dom'

const navbar = () => {
    return (
      <nav className="navbar shadow-1 primary">
        <Link to="https://google.com" className="navbar-brand">Axentix</Link>
        <div className="navbar-menu ml-auto">
          <Link className="navbar-link active" to="/">Link</Link>
          <Link className="navbar-link" to="/auth">Auth</Link>
          <Link className="navbar-link" to="/contact">Contact</Link>
        </div>
      </nav>
    );
}

export default navbar;