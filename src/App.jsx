import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Order from './pages/Order';
import Payment from './pages/Payment';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import { CartProvider } from './context/CartContext';

import Footer from './components/layout/Footer';

// Wrapper to conditionally hide navbars on admin route
const Layout = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdmin && <Navbar />}
      <main className={!isAdmin ? "min-h-screen" : "min-h-screen"}>
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <BottomNav />}
    </>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/order" element={<Order />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin/*" element={<Admin />} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;
