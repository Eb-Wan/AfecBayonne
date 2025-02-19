import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ isConnected }) => {
  const { pathname } = useLocation();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" > <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top"/>Le seigneur site web</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {
                isConnected ? <>
                  <li className="nav-item">
                    <Link className={(pathname === "/contact" ? "active " : "") + "nav-link"} to="/contact">Contact</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={(pathname === "/logout" ? "active " : "") + "nav-link"} to="/logout">Deconnexion</Link>
                  </li>
                </>:<>
                  <li className="nav-item">
                    <Link className={(pathname === "/login" ? "active " : "") + "nav-link"} to="/login">Connexion</Link>
                  </li>
                  <li className="nav-item">
                    <Link className={(pathname === "/register" ? "active " : "") + "nav-link"} to="/register">Inscription</Link>
                  </li>
                </>
              }
            </ul>
          </div>
        </div>

      </nav>
    </>
  )
}

export default Navbar