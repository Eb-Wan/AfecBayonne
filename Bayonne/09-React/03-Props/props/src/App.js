import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Services from "./pages/Services"

function App() {
    const HeaderLinks = [
        {name: "Accueil", link: "/"},
        {name: "Services", link: "/services"},
        {name: "Contact", link: "/contact"},
        {name: "A propos", link: "/a-propos"}
    ];

    const FooterLinks = [{name:"Twitter", link: "https://twitter.com"}];
    return (
        <>
            <Router>
                <Header logo="shronkey.png" links={HeaderLinks}/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/a-propos" element={<About/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/services" element={<Services/>}/>
                </Routes>
                <Footer copyrights='DWWM_Bayonne, : © 2025 Mon Application' socialLinks={FooterLinks} />
            </Router>
        </>
    );
}

export default App;
