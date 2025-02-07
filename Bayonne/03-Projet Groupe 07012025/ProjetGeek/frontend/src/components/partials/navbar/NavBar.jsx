import React from "react";
import { Link } from "react-router-dom";
import "bulma/css/bulma.min.css";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="jesaispas,jeconnaispasbulma">
        <Link to={`/`}>Home</Link>
        <Link to={`/ads/`}>Annonces</Link>
        <Link to={`/donations`}>Dons</Link>
        <Link to={`/cart`}>Panier</Link>
        <button>
          <Link to="/login" className="button is-light">
            Se connecter
          </Link>
        </button>
        <button>
          <Link to="/register" className="button is-link">
            S'inscrire
          </Link>
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
