"use client";

import React from 'react';
import { Charger } from '@/types/types';

interface BubbleLayoutProps {
  children: React.ReactNode;
  isOverlayVisible?: boolean;
  selectedView?: 'chargerDetails' | 'dobichart' | null;
}

const BubbleLayout: React.FC<BubbleLayoutProps> = ({ 
  children,
  isOverlayVisible,
  selectedView,
}) => {
  return (
    <div className="relative">
      {/* Background with Blur Effect */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-500 ${isOverlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      
      {/* Main Content with Fade Transition */}
      <div className={`relative z-10 transition-opacity duration-500 ${isOverlayVisible ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </div>
  );
};

export default BubbleLayout; 