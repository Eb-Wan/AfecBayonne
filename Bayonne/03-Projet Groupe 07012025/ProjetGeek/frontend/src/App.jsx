import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import AdsList from "./pages/Ads/AdsList";
import CreateAd from "./pages/Ads/CreateAd";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Donations from "./pages/Donations";
import NavBar from "./components/partials/navbar/NavBar";
import Footer from "./components/partials/Footer";
import AdDetails from "./pages/Ads/AdDetails";

function Layout() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  const shouldHideLayout = hiddenRoutes.includes(location.pathname);
  return (
    <div>
      {!shouldHideLayout && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ads" element={<AdsList />} />
        <Route path="/ads/:id" element={<AdDetails />} />
        <Route path="/ads/create" element={<CreateAd />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/donations" element={<Donations />} />
      </Routes>
      {!shouldHideLayout && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
