import React from 'react';
import GlassCard from '../components/ui/GlassCard';

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-24 md:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16 relative">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#FF7A18]/20 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Story</h1>
        <p className="text-xl text-[#FFB347] font-medium max-w-2xl mx-auto">
          Redefining the boundaries of fine dining through passion, innovation, and artistry.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(255,122,24,0.15)]">
          <img
            src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=80"
            alt="Restaurant Interior"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">A Culinary Sanctuary</h2>
          <p className="text-gray-400 leading-relaxed font-light text-lg">
            Born from a vision to create an unparalleled dining experience, Zestio represents the pinnacle of modern gastronomy. Our journey began with a simple belief: food is not just sustenance, but an art form that engages all senses.
          </p>
          <p className="text-gray-400 leading-relaxed font-light text-lg">
            Every dish is a masterpiece, carefully curated using the finest, ethically sourced ingredients from local artisans and global purveyors. The atmosphere is designed to wrap you in a cocoon of luxury, where every detail is meticulously considered.
          </p>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Meet the Masters</h2>
        <p className="text-gray-400">The brilliant minds behind our exceptional creations.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { name: 'Marcus', role: 'Executive Chef', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=600&q=80' },
          { name: 'Abhinav Kumar', role: 'Web Desinger & Developer', image: 'https://images.unsplash.com/photo-1563132337-f159f484226c?auto=format&fit=crop&w=600&q=80' },
          { name: 'Suraj Chetri', role: 'Contractor', image: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80' }
        ].map((member, i) => (
          <GlassCard key={i} className="overflow-hidden flex flex-col items-center p-6 text-center">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-6 border-2 border-[#FF7A18]/30">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-[#FFB347] text-sm">{member.role}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default About;
