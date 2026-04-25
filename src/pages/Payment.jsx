import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { Upload, CheckCircle } from 'lucide-react';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalAmount } = location.state || { totalAmount: 0 };
  
  const [file, setFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('online'); // 'online' | 'cash'

  const finalAmount = (totalAmount * 1.1).toFixed(2);
  const upiId = localStorage.getItem('adminUpiId') || 'zestio@upi';
  const upiString = `upi://pay?pa=${upiId}&pn=Zestio&am=${finalAmount}&cu=INR`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(upiString)}`;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmitPayment = () => {
    if (paymentMethod === 'online' && !file) return alert('Please upload a payment screenshot');
    
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <GlassCard className="p-10 text-center max-w-md w-full animate-pulse-slow">
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Payment Pending Verification</h2>
          <p className="text-gray-400">
            Thank you for your order. We are verifying your payment and will start preparing your meal shortly!
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32 md:pb-12 px-4 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 relative">
         {/* Glow effect */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#FF7A18]/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

        {/* Payment Method Toggle */}
        <GlassCard className="p-2 flex rounded-full mb-8">
          <button
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 ${paymentMethod === 'online' ? 'bg-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setPaymentMethod('online')}
          >
            Pay Online
          </button>
          <button
            className={`flex-1 py-3 px-6 rounded-full font-medium transition-all duration-300 ${paymentMethod === 'cash' ? 'bg-[#FF7A18] text-white shadow-[0_0_15px_rgba(255,122,24,0.4)]' : 'text-gray-400 hover:text-white'}`}
            onClick={() => setPaymentMethod('cash')}
          >
            Pay Cash
          </button>
        </GlassCard>

        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Complete Payment</h1>
          <p className="text-gray-400">
            {paymentMethod === 'online' ? 'Scan the QR code to pay using any UPI app' : 'Please pay cash to our staff'}
          </p>
        </div>

        <GlassCard className="p-8">
          <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-4">
            <span className="text-lg text-gray-300">Total to Pay</span>
            <span className="text-3xl font-bold gradient-text">${finalAmount}</span>
          </div>

          {paymentMethod === 'online' ? (
            <>
              <div className="bg-white p-4 rounded-xl flex items-center justify-center mb-8 mx-auto w-48 h-48 overflow-hidden">
                <img 
                  src={qrUrl} 
                  alt="Payment QR Code" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <label className="block text-sm text-gray-400">Upload Payment Screenshot</label>
                <div className="relative border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-[#FF7A18]/50 transition-colors cursor-pointer group">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2 group-hover:text-[#FFB347] transition-colors" />
                  <p className="text-sm text-gray-300">
                    {file ? file.name : "Tap or click to select image"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="py-12 text-center">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#FF7A18]/30">
                <span className="text-4xl">💵</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Cash Payment Selected</h3>
              <p className="text-gray-400">
                Please prepare the exact amount of ${finalAmount}. You can pay directly to our waiter or at the counter.
              </p>
            </div>
          )}

        </GlassCard>

        {/* Fixed bottom button for mobile, normal for desktop */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[#0A0A0A]/90 backdrop-blur-md border-t border-white/10 md:static md:bg-transparent md:border-0 md:p-0">
          <Button variant="primary" fullWidth onClick={handleSubmitPayment} className="shadow-[0_0_20px_rgba(255,122,24,0.3)]">
            Submit Payment
          </Button>
        </div>

      </div>
    </div>
  );
};

export default Payment;
