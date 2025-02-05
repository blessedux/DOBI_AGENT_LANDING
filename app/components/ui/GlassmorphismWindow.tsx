"use client";

import React, { useEffect, useState, useRef } from "react";

interface GlassmorphismWindowProps {
  activeTab: "architecture" | "devices";
}

const bulletPoints = [
  "Decentralized Financial Engine – The Dobi Agent is the core automation layer of DOB Protocol, enabling trustless benefit distribution in tokenized RWA investments.",
  "Autonomous Smart Contract System – It operates without intermediaries, ensuring transparent and efficient financial flows.",
  "Real-World Asset Integration – Connects to physical assets like EV chargers, real estate, and tokenized businesses, enabling real-time revenue tracking.",
  "Automated Profit Distribution – Uses smart contracts to automatically distribute earnings to investors based on predefined rules.",
  "IoT & On-Chain Data Synergy – Links real-world performance data from assets with blockchain-based financial operations.",
  "Lower Collateral, Higher Efficiency – Reduces collateral requirements for investors by optimizing risk-adjusted returns.",
  "Scalable & Multi-Industry – Can be applied across industries, from renewable energy and infrastructure to corporate finance and tokenized projects.",
  "Base Network & Web3 Native – Built on Base Network, ensuring speed, security, and low transaction costs.",
  "First Use Case: Decentralized EV Charging – Powers E-Hive, turning EV chargers into autonomous revenue-generating machines.",
  "Trustless & Fraud-Proof – Eliminates manual intervention, minimizing fraud risk while increasing efficiency.",
  "Smart Revenue Optimization – Dynamically adjusts distribution models based on market conditions and asset performance.",
  "Foundation for Future Finance – The Dobi Agent is the backbone of DOB Protocol's long-term vision, bringing decentralized financial automation to global investments.",
];

const GlassmorphismWindow: React.FC<GlassmorphismWindowProps> = ({ activeTab }) => {
  const [currentText, setCurrentText] = useState("");
  const [currentBulletIndex, setCurrentBulletIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [width, setWidth] = useState(320); // Smaller default width
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const typingSpeed = 30;
  const deletingSpeed = 15;
  const pauseDuration = 4000;

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentBulletIndex((prev) => (prev + 1) % bulletPoints.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText("");  // Clear all text at once
        }, deletingSpeed);
      }
    } else {
      const fullText = bulletPoints[currentBulletIndex];
      if (currentText === fullText) {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentBulletIndex, isDeleting]);

  // Handle resize functionality
  const startResizing = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    startWidth.current = width;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', stopResizing);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    const delta = e.pageX - startX.current;
    const newWidth = Math.max(280, Math.min(600, startWidth.current + delta));
    setWidth(newWidth);
  };

  const stopResizing = () => {
    isDragging.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div className={`
      fixed top-20 left-8 
      bg-white/10 backdrop-blur-md 
      border border-white/20 rounded-2xl 
      shadow-2xl shadow-black/10
      transition-all duration-300
      md:w-[320px] md:h-[200px]
      w-[280px] h-[160px]
      flex flex-col
      overflow-hidden
    `}>
      <div className="flex items-center p-4 border-b border-white/10">
        <div className="text-xs text-white/60">Terminal</div>
      </div>
      <div className="flex-1 p-4 text-[10px] leading-5 text-white/80 font-mono">
        <div className="text-gray-200 leading-relaxed">
          <span className="text-blue-400">dobi@agent</span>
          <span className="text-gray-400">:</span>
          <span className="text-green-400">~</span>
          <span className="text-gray-400">$ </span>
          <span>{currentBulletIndex + 1}. {currentText}</span>
          <span className="inline-block w-2 h-4 bg-gray-200 ml-1 animate-pulse">▋</span>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismWindow; 