import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Menu as MenuIcon, ShoppingBag, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BottomNav = () => {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Menu', path: '/menu', icon: MenuIcon },
    { name: 'Order', path: '/order', icon: ShoppingBag },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <div className="md:hidden fixed bottom-0 w-full z-50">
      {/* Gradient border top */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#FF7A18]/50 to-transparent"></div>
      
      <div className="bg-[#0A0A0A]/80 backdrop-blur-xl px-6 py-3">
        <div className="flex justify-between items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center space-y-1 transition-colors duration-300 relative ${
                    isActive ? 'text-[#FF7A18]' : 'text-gray-400 hover:text-gray-200'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon className={`w-6 h-6 ${isActive ? 'drop-shadow-[0_0_8px_rgba(255,122,24,0.5)]' : ''}`} />
                    <span className="text-[10px] font-medium">{item.name}</span>
                    {item.name === 'Order' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 bg-[#FF7A18] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
