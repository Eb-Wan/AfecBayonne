import './App.css';
import NavBar from './component/partials/navbar';
import Footer from './component/partials/footer';
import Home from './component/home'
import Contact from './component/contact';
import Auth from './component/auth';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
   
    <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/auth" element={<Auth/>} />
        </Routes>
        <Footer/>
    </Router>
    </>
  );
}

export default App;
