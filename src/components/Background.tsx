import React from 'react';
import { motion } from 'framer-motion';

export const Background = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-[#020202]">
      {/* Deep Glow Effect */} 
      <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#39de7f]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#39de7f]/5 rounded-full blur-[100px]" />
      
      {/* Subtle Scanline Effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgba(57, 222, 127, 0.1) 1px, transparent 1px)', backgroundSize: '100% 3px' }} />
      
      {/* Dark Noise / Grain Overlay */}
      <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};