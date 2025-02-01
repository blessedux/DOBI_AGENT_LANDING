"use client";

import React, { useEffect, useState } from "react";

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
  const typingSpeed = 30; // Speed for typing
  const deletingSpeed = 15; // Speed for deleting
  const pauseDuration = 4000; // 4 seconds pause when text is complete

  // Only run the typing effect when the architecture tab is active
  useEffect(() => {
    if (activeTab !== "architecture") {
      setCurrentText("");
      return;
    }

    let timeout: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentBulletIndex((prev) => (prev + 1) % bulletPoints.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1));
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
  }, [currentText, currentBulletIndex, isDeleting, activeTab]);

  // Don't render anything if not on architecture tab
  if (activeTab !== "architecture") return null;

  return (
    <div className="absolute top-20 left-4 z-30 p-6 rounded-lg backdrop-blur-md bg-gray-800/50 border border-gray-300/50 shadow-lg w-[300px]">
      <h2 className="text-white text-lg font-bold mb-4">DOBI Agent Features</h2>
      <p className="text-gray-200 leading-relaxed">
        {currentBulletIndex + 1}. {currentText}
        <span className="animate-pulse">|</span>
      </p>
    </div>
  );
};

export default GlassmorphismWindow; 