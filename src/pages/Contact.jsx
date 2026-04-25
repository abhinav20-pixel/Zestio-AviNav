import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-400 max-w-2xl mx-auto font-light">
          We'd love to hear from you. Get in touch for reservations, private events, or general inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-8">Get in Touch</h2>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <MapPin className="text-[#FFB347] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Our Location</h3>
              <p className="text-gray-400 font-light">123 Luxury Avenue, Skyline District<br />Metropolis, NY 10001</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Phone className="text-[#FFB347] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Reservations</h3>
              <p className="text-gray-400 font-light">+91 1234567890</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Mail className="text-[#FFB347] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Email Us</h3>
              <p className="text-gray-400 font-light">abhinav.devstudio@gmail.com</p>
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
              <Clock className="text-[#FFB347] w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-lg mb-1">Opening Hours</h3>
              <p className="text-gray-400 font-light">Mon-Sun: 5:00 PM - 11:30 PM</p>
            </div>
          </GlassCard>
        </div>

        {/* Contact Form */}
        <GlassCard className="p-8">
          <h2 className="text-2xl font-semibold mb-8">Send a Message</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">First Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Message</label>
              <textarea
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF7A18] transition-colors resize-none"
                placeholder="How can we help you?"
              ></textarea>
            </div>
            <Button variant="primary" fullWidth>Send Message</Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default Contact;
