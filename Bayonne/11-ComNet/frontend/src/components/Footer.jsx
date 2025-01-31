import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <div className="justify-left">
                Copyright: rien
            </div>
            <div className="justify-right">
                <Link to="/terms">Terms & conditions</Link>
            </div>
        </footer>
    );
}

export default Footer;