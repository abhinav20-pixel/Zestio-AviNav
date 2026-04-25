import React from 'react';
import { Mail, MessageCircle, UtensilsCrossed } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
          
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-[#FF7A18] to-[#FFB347]">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>
              <span className="font-serif text-3xl font-bold tracking-wide text-white">
                Zest<span className="text-[#FF7A18]">io</span>
              </span>
            </div>
            <p className="text-gray-400 font-light text-lg font-serif italic tracking-wide">
              Where Taste Meets Elegance
            </p>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-white tracking-wider uppercase text-sm">Visit Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF7A18] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,122,24,0.4)]">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF7A18] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,122,24,0.4)]">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF7A18] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,122,24,0.4)]">
                <Mail className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-[#FF7A18] hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-[0_0_15px_rgba(255,122,24,0.4)]">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500 font-light tracking-wide">
          <p>© 2026 Zestio Restaurant. All rights reserved.</p>
          <p>Made with love by AviNav</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
