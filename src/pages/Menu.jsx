import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { menuItems } from '../data/dummyData';
import { Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Menu = () => {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (item) => {
    addToCart(item);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems(prev => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Menu</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light">
          Explore a symphony of flavors crafted to elevate your dining experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {menuItems.map((item) => (
          <GlassCard key={item.id} hoverEffect className="overflow-hidden flex flex-col group">
            <div className="relative h-56 overflow-hidden">
               <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-4 right-4 bg-[#0A0A0A]/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 border border-white/10">
                 <Star className="w-3.5 h-3.5 fill-[#FFB347] text-[#FFB347]" />
                 {item.rating}
              </div>
            </div>
            
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold pr-4">{item.name}</h3>
                <span className="text-xl font-medium gradient-text">${item.price}</span>
              </div>
              <p className="text-gray-500 text-sm mb-6 flex-grow">{item.category}</p>
              
              <Button 
                variant={addedItems[item.id] ? "primary" : "glass"} 
                fullWidth
                onClick={() => handleAddToCart(item)}
              >
                {addedItems[item.id] ? <><Check className="w-4 h-4 mr-2" /> Added</> : "Add to Order"}
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Menu;
