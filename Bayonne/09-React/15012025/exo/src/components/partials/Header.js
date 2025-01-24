import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div>
            <nav className="navbar shadow-1 primary">
                <Link reloadDocument to="/" className="navbar-brand">Axentix</Link>
                <div className="navbar-menu ml-auto">
                    <Link reloadDocument className="navbar-link" to="/">Accueil</Link>
                    <Link reloadDocument className="navbar-link" to="/Services">Services</Link>
                    <Link reloadDocument className="navbar-link" to="/About">A propos</Link>
                    <Link reloadDocument className="navbar-link" to="/Contact">Contact</Link>
                </div>
            </nav>
        </div>
    </>
  )
}

export default Header