import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './components/partials/Header'
import Footer from './components/partials/Footer'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Services from './components/Services'

function App() {
  return (
    <>
   
    <Router>
        <Header/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/Services" element={<Services/>} />
        </Routes>
        <Footer/>
    </Router>
    </>
  );
}

export default App;
