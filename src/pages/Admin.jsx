import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { menuItems as initialMenu } from '../data/dummyData';
import { LayoutDashboard, Utensils, ClipboardList, Settings, Plus, Trash2, Edit2, Upload } from 'lucide-react';

const initialDummyOrders = [
  { id: 'ORD-001', name: 'Alice Smith', mobile: '+1 234 567 8901', type: 'dine-in', guests: 2, items: ['Truffle Mushroom Risotto'], total: 24, status: 'paid' },
  { id: 'ORD-002', name: 'Bob Jones', mobile: '+1 987 654 3210', type: 'takeaway', guests: null, items: ['Wagyu Ribeye Steak', 'Dark Chocolate Fondant'], total: 99, status: 'pending' },
];

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'menu', 'orders', 'settings'
  const [menu, setMenu] = useState(initialMenu);
  const [totalTables, setTotalTables] = useState(20);
  const [orders, setOrders] = useState(initialDummyOrders);
  const [upiId, setUpiId] = useState(localStorage.getItem('adminUpiId') || 'zestio@upi');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState(null);
  const [itemForm, setItemForm] = useState({ name: '', category: 'Mains', price: '', image: '' });

  // Menu Handlers
  const openAddModal = () => {
    setEditingItemId(null);
    setItemForm({ name: '', category: 'Mains', price: '', image: '' });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItemId(item.id);
    setItemForm({ name: item.name, category: item.category, price: item.price, image: item.image });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!itemForm.name || !itemForm.price) return alert("Name and price are required");
    
    const imageToSave = itemForm.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
    
    if (editingItemId) {
      setMenu(menu.map(m => m.id === editingItemId ? { ...m, ...itemForm, price: parseFloat(itemForm.price), image: imageToSave } : m));
    } else {
      const newItem = {
        id: Date.now(),
        name: itemForm.name,
        category: itemForm.category,
        price: parseFloat(itemForm.price),
        rating: 5.0, // default dummy rating
        image: imageToSave
      };
      setMenu([newItem, ...menu]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setMenu(menu.filter(m => m.id !== id));
    }
  };

  // Order Handlers
  const handleMarkPaid = (orderId) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'paid' } : o));
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto flex flex-col md:flex-row gap-8">
      
      {/* Sidebar */}
      <div className="w-full md:w-64 space-y-4">
        <div className="mb-8 px-4">
          <h1 className="text-2xl font-bold font-serif tracking-wide gradient-text">Zestio Admin</h1>
        </div>
        
        <nav className="space-y-2">
          {[
            { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            { id: 'menu', name: 'Menu Management', icon: Utensils },
            { id: 'orders', name: 'Orders', icon: ClipboardList },
            { id: 'settings', name: 'Settings', icon: Settings }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? 'bg-white/10 text-white shadow-[inset_2px_0_0_#FF7A18]' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span className="font-medium">{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Total Orders Today</h3>
                  <div className="p-2 bg-blue-500/20 text-blue-400 rounded-lg"><ClipboardList className="w-5 h-5" /></div>
                </div>
                <p className="text-3xl font-bold">24</p>
                <p className="text-sm text-green-400 mt-2">+12% from yesterday</p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Total Revenue</h3>
                  <div className="p-2 bg-green-500/20 text-green-400 rounded-lg"><span className="text-lg font-bold">$</span></div>
                </div>
                <p className="text-3xl font-bold gradient-text">$1,284.50</p>
                <p className="text-sm text-green-400 mt-2">+8% from yesterday</p>
              </GlassCard>
              
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 font-medium">Available Tables</h3>
                  <div className="p-2 bg-[#FF7A18]/20 text-[#FF7A18] rounded-lg"><Utensils className="w-5 h-5" /></div>
                </div>
                <p className="text-3xl font-bold">8 <span className="text-lg text-gray-500 font-normal">/ {totalTables}</span></p>
                <p className="text-sm text-gray-400 mt-2">Currently serving 32 guests</p>
              </GlassCard>
            </div>

            <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
            <GlassCard className="p-0 overflow-hidden">
              <div className="divide-y divide-white/10">
                {[
                  { time: '10 mins ago', action: 'New Order received (Takeaway) - $45.00' },
                  { time: '25 mins ago', action: 'Table 4 paid and cleared - $120.00' },
                  { time: '1 hour ago', action: 'New Order received (Dine-in, Table 4)' },
                ].map((activity, i) => (
                  <div key={i} className="p-4 px-6 flex items-center justify-between hover:bg-white/5 transition-colors">
                    <span className="text-gray-300">{activity.action}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        )}

        {/* Menu Management */}
        {activeTab === 'menu' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Menu Items</h2>
              <Button variant="primary" className="py-2" onClick={openAddModal}>
                <Plus className="w-4 h-4 mr-2"/> Add Item
              </Button>
            </div>
            
            <GlassCard className="overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="p-4 font-medium text-gray-300">Item</th>
                      <th className="p-4 font-medium text-gray-300">Category</th>
                      <th className="p-4 font-medium text-gray-300">Price</th>
                      <th className="p-4 font-medium text-gray-300 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menu.map((item, idx) => (
                      <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img src={item.image} alt={item.name} className="w-10 h-10 rounded object-cover" />
                            <span className="font-medium">{item.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">{item.category}</td>
                        <td className="p-4">${item.price}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => openEditModal(item)} className="p-2 text-blue-400 hover:text-blue-300"><Edit2 className="w-4 h-4"/></button>
                          <button onClick={() => handleDeleteItem(item.id)} className="p-2 text-red-400 hover:text-red-300"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Orders Management */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Recent Orders</h2>
            
            <div className="grid gap-4">
              {orders.map(order => (
                <GlassCard key={order.id} className="p-6">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4 pb-4 border-b border-white/10">
                    <div>
                      <h3 className="font-semibold text-lg">{order.id} - {order.name}</h3>
                      <p className="text-sm text-gray-400">{order.mobile} • {order.type} {order.guests ? `(${order.guests} guests)` : ''}</p>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <p className="text-xl font-bold gradient-text">${order.total}</p>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                        order.status === 'paid' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                      {order.status === 'pending' && (
                        <Button 
                          variant="glass" 
                          className="py-1 px-3 text-xs mt-2 border-green-500/30 text-green-400 hover:bg-green-500/10"
                          onClick={() => handleMarkPaid(order.id)}
                        >
                          Mark as Paid
                        </Button>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {order.items.map((item, i) => (
                        <span key={i} className="bg-white/5 px-3 py-1 rounded-lg text-sm border border-white/5">{item}</span>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-bold">Restaurant Settings</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <GlassCard className="p-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Table Management</h3>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Total Tables Available</label>
                  <input 
                    type="number" 
                    value={totalTables}
                    onChange={(e) => setTotalTables(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18]"
                  />
                </div>
                <Button variant="glass" className="w-full">Update Tables</Button>
              </GlassCard>

              <GlassCard className="p-6 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Payment Configuration</h3>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Merchant UPI ID</label>
                  <input 
                    type="text" 
                    value={upiId}
                    onChange={(e) => {
                      setUpiId(e.target.value);
                      localStorage.setItem('adminUpiId', e.target.value);
                    }}
                    placeholder="e.g., yourname@upi"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18]"
                  />
                  <p className="text-xs text-gray-500 mt-2">QR codes for checkout will be automatically generated using this UPI ID.</p>
                </div>
              </GlassCard>
            </div>
          </div>
        )}

      </div>

      {/* Modal Overlay for Add/Edit Menu Item */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <GlassCard className="w-full max-w-md p-6">
            <h2 className="text-2xl font-bold mb-6">{editingItemId ? 'Edit Item' : 'Add New Item'}</h2>
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Name</label>
                <input 
                  type="text" 
                  value={itemForm.name}
                  onChange={e => setItemForm({...itemForm, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF7A18]"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Price</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={itemForm.price}
                    onChange={e => setItemForm({...itemForm, price: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF7A18]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select 
                    value={itemForm.category}
                    onChange={e => setItemForm({...itemForm, category: e.target.value})}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-[#FF7A18]"
                  >
                    <option value="Mains">Mains</option>
                    <option value="Starters">Starters</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Image Upload</label>
                <div className="flex items-center gap-4">
                  {itemForm.image && <img src={itemForm.image} alt="Preview" className="w-12 h-12 rounded object-cover" />}
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={e => {
                      if(e.target.files && e.target.files[0]) {
                        setItemForm({...itemForm, image: URL.createObjectURL(e.target.files[0])})
                      }
                    }}
                    className="flex-1 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                <Button variant="primary" type="submit" className="py-2">Save Item</Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default Admin;
