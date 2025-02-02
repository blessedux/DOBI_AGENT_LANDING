"use client";

import React from 'react';

interface VectorWindowProps {
  activeTab: string;
}

const VectorWindow: React.FC<VectorWindowProps> = ({ activeTab }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Add your vector graphics or window decorations here */}
      <div className="absolute top-4 left-4 text-white/50">
        {activeTab.toUpperCase()}
      </div>
    </div>
  );
};

export default VectorWindow; 