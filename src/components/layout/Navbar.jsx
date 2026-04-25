import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, UtensilsCrossed } from 'lucide-react';
import Button from '../ui/Button';
import { useCart } from '../../context/CartContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Order', path: '/order' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0A0A0A]/60 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF7A18] to-[#FFB347]">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold tracking-wide">
              Zest<span className="text-[#FF7A18]">io</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors duration-300 hover:text-[#FFB347] relative ${
                      isActive ? 'text-[#FF7A18]' : 'text-gray-300'
                    }`
                  }
                >
                  {link.name}
                  {link.name === 'Order' && cartCount > 0 && (
                    <span className="absolute -top-2 -right-3 bg-[#FF7A18] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/order">
              <Button variant="primary">
                Order Now {cartCount > 0 && `(${cartCount})`}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden items-center gap-4">
             {cartCount > 0 && (
               <Link to="/order" className="relative text-white">
                 <span className="bg-[#FF7A18] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount} items
                 </span>
               </Link>
             )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none transition-colors"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-white/5">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-base font-medium flex justify-between items-center ${
                  isActive ? 'text-[#FF7A18] bg-white/5' : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`
              }
            >
              {link.name}
              {link.name === 'Order' && cartCount > 0 && (
                <span className="bg-[#FF7A18] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-4 pb-2">
             <Link to="/order" onClick={() => setIsOpen(false)}>
               <Button variant="primary" fullWidth>Order Now</Button>
             </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
