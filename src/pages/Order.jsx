import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { menuItems } from '../data/dummyData';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Order = () => {
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity, removeItem, clearCart } = useCart();
  const [orderType, setOrderType] = useState('dine-in'); // 'dine-in' | 'takeaway'
  const [formData, setFormData] = useState({ name: '', mobile: '', guests: 1 });
  const [selectedTable, setSelectedTable] = useState(null);
  
  // Dummy table data
  const totalTables = 20;
  const availableTables = 8;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Please add items to order from the Menu.');
    if (orderType === 'dine-in' && !selectedTable) return alert('Please select an available table for your dine-in order.');
    
    // In a real app, send order to backend here
    navigate('/payment', { state: { totalAmount, cart, orderType, selectedTable, formData } });
  };

  return (
    <div className="min-h-screen pt-24 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Place Your Order</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Form & Menu */}
        <div className="flex-1 space-y-8">
          
          {/* Order Type Toggle */}
          <GlassCard className="p-2 flex rounded-full">
            <button
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 ${orderType === 'dine-in' ? 'bg-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setOrderType('dine-in')}
            >
              Dine-in
            </button>
            <button
              className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 ${orderType === 'takeaway' ? 'bg-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]' : 'text-gray-400 hover:text-white'}`}
              onClick={() => setOrderType('takeaway')}
            >
              Takeaway
            </button>
          </GlassCard>

          {/* Details Form */}
          <GlassCard className="p-6">
            <h2 className="text-xl font-semibold mb-6">Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Mobile Number</label>
                <input 
                  type="tel" 
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                  placeholder="+1 234 567 8900"
                />
              </div>
              {orderType === 'dine-in' && (
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Number of Guests</label>
                  <input 
                    type="number" 
                    name="guests"
                    min="1"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                  />
                </div>
              )}
            </div>
          </GlassCard>

          {/* Table Selection */}
          {orderType === 'dine-in' && (
            <GlassCard className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Select Table</h2>
                <span className="text-sm text-gray-400">Available: {availableTables}/{totalTables}</span>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {Array.from({ length: totalTables }, (_, i) => i + 1).map(tableNum => {
                  // Mock some tables as unavailable
                  const isUnavailable = [3, 7, 12, 14, 18].includes(tableNum);
                  const isSelected = selectedTable === tableNum;
                  
                  return (
                    <button
                      key={tableNum}
                      disabled={isUnavailable}
                      onClick={() => setSelectedTable(tableNum)}
                      className={`
                        py-3 rounded-xl font-medium transition-all text-center border
                        ${isUnavailable 
                          ? 'bg-white/5 border-white/5 text-gray-600 cursor-not-allowed' 
                          : isSelected
                            ? 'bg-[#FF7A18] border-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]'
                            : 'bg-white/5 border-white/10 text-gray-300 hover:border-[#FF7A18]/50 hover:bg-white/10'
                        }
                      `}
                    >
                      {tableNum}
                    </button>
                  );
                })}
              </div>
            </GlassCard>
          )}

        </div>

        {/* Right Column: Cart Summary */}
        <div className="w-full lg:w-[400px]">
          <GlassCard className="p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            
            {cart.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                Your cart is empty
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-[#FFB347] text-sm">${item.price * item.quantity}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-gray-400 hover:text-white"><Minus className="w-4 h-4"/></button>
                        <span className="text-sm w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-gray-400 hover:text-white"><Plus className="w-4 h-4"/></button>
                        <button onClick={() => removeItem(item.id)} className="p-1 text-red-400 hover:text-red-300 ml-2"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Subtotal</span>
                    <span>${totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-400">Taxes</span>
                    <span>${(totalAmount * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#FF7A18]">${(totalAmount * 1.1).toFixed(2)}</span>
                  </div>
                </div>

                <Button variant="primary" fullWidth onClick={handleSubmit}>
                  Proceed to Payment
                </Button>
              </>
            )}
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default Order;
