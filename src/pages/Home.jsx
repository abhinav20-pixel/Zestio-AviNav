import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import { features, menuItems } from '../data/dummyData';
import { ArrowRight, Star, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Home = () => {
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
    <div className="min-h-screen pt-20 pb-24 md:pb-0">
      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 lg:py-32 overflow-hidden flex flex-col items-center text-center">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF7A18]/20 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        <h1 className="text-5xl md:text-7xl font-bold max-w-4xl leading-tight mb-6">
          Savor Every Moment with <span className="gradient-text">Every Bite</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 font-light">
          Experience culinary perfection at Zestio. A fusion of modern gastronomy and luxurious dining ambiance.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link to="/order" className="w-full sm:w-auto">
            <Button variant="primary" fullWidth className="text-lg px-8">
              Order Now
            </Button>
          </Link>
          <Link to="/menu" className="w-full sm:w-auto">
            <Button variant="glass" fullWidth className="text-lg px-8">
              Reserve Table
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <GlassCard key={index} hoverEffect className="p-8 text-left">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                <Star className="w-6 h-6 text-[#FFB347]" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400 font-light leading-relaxed">
                {feature.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Featured Menu Preview */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto relative">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Signature Dishes</h2>
            <p className="text-gray-400 font-light max-w-xl">
              A glimpse into our chef's masterpieces.
            </p>
          </div>
          <Link to="/menu" className="hidden md:flex items-center gap-2 text-[#FFB347] hover:text-[#FF7A18] transition-colors">
            View full menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.slice(0, 3).map((item) => (
            <GlassCard key={item.id} hoverEffect className="overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent z-10 opacity-60"></div>
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-6 relative z-20 -mt-10">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <span className="text-[#FFB347] font-medium">${item.price}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-400 mb-4">
                  <Star className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />
                  <span>{item.rating}</span>
                </div>
                <Button 
                  variant={addedItems[item.id] ? "primary" : "glass"} 
                  fullWidth 
                  className="py-2 text-sm"
                  onClick={() => handleAddToCart(item)}
                >
                  {addedItems[item.id] ? <><Check className="w-4 h-4 mr-2" /> Added</> : "Add to Order"}
                </Button>
              </div>
            </GlassCard>
          ))}
        </div>
        
        <div className="mt-8 text-center md:hidden">
           <Link to="/menu" className="inline-flex items-center gap-2 text-[#FFB347]">
            View full menu <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
