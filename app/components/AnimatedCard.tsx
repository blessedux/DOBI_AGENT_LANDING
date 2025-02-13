"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  title: string;
  model: string;
  address: string;
  transactions: number;
  balance: number;
  step?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  title, 
  model, 
  address, 
  transactions, 
  balance,
  step 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="fixed w-[200px] p-4 bg-white shadow-lg rounded-lg"
      style={{
        top: isMobile ? '40vh' : '200px',
        left: '15vw',
    
        zIndex: 50
      }}
    >
      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-1">
        <span className="text-xs font-medium text-blue-600/60 bg-blue-500/10 px-2 py-0.5 rounded-full">
          Step {step} of 10
        </span>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-blue-600 text-sm mb-2">{title}</h3>

      {/* Divider */}
      <div className="border-t my-2" />

      {/* Description - Using the model field for now */}
      <p className="text-xs text-gray-600 mb-2">
        {model}
      </p>

      {/* Stats in a more compact format */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-[#F9FAFE] p-2 rounded-lg">
          <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Txs</p>
          <p className="text-sm font-semibold opacity-60">{transactions}</p>
        </div>
        <div className="bg-[#F9FAFE] p-2 rounded-lg">
          <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Balance</p>
          <p className="text-sm font-semibold opacity-60">${balance.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default AnimatedCard; 