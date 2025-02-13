"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  title: string;
  model: string;
  step?: number;
  isMobile?: boolean;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ 
  title, 
  model,
  step,
  isMobile 
}) => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isSmallMobile: false
  });
  const [cardHeight, setCardHeight] = useState(0);
  const primaryCardRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      setScreenSize({
        isMobile: window.innerWidth < 768,
        isSmallMobile: window.innerWidth < 480
      });
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Update card height when content changes
  useEffect(() => {
    if (primaryCardRef.current) {
      setCardHeight(primaryCardRef.current.offsetHeight);
    }
  }, [title, model, step]);

  const getStepType = (step: number) => {
    if (step >= 6 && step <= 10) return "Smart Contract";
    if (step === 5) return "ZKP";
    if (step === 4) return "On-ramp Service";
    if (step === 3) return "Fuzzy AI";
    if (step <= 2) return "TEE";
  };

  const getDetailedDescription = (step: number) => {
    switch(step) {
      case 10: return "Manage variable costs based on the energy used during the charging session";
      case 9: return "Manage fixed costs, including rent, maintenance, and insurance.";
      case 8: return "The costs (70%) are divided into fixed and variable costs. Fixed costs include rent, maintenance, and insurance, while variable costs cover energy usage.";
      case 7: return "The profit (30%) is distributed proportionally to token holders in the Dobprotocol pool";
      case 6: return "The funds are sent to the Dobprotocol profit pool, where the profit and costs are managed.";
      case 5: return "Funds are deposited securely using a Zero Knowledge Proof system for privacy-preserving verification.";
      case 4: return "The payment in fiat is converted to the DOB token using an on-ramp service.";
      case 3: return "The DOBI-CORE AI agent analyzes the validated reports and prepares financial allocations: profit vs costs.";
      case 2: return "The accountability system processes RWA reports, validates data for consistency, and ensures proper recording of the transaction";
      case 1: return "The EV charger operates as a Real World Asset (RWA) and receives a transaction to start charging energy. Generates initial reports on energy usage and payment.";
      default: return "";
    }
  };

  // Calculate dynamic positions and sizes based on screen size
  const getPrimaryCardStyle = () => {
    if (screenSize.isSmallMobile) {
      return {
        width: '260px',
        top: '30vh',
        left: '10%',
        transform: 'translateX(-50%)',
        zIndex: 50
      };
    }
    if (screenSize.isMobile) {
      return {
        width: '280px',
        top: '30vh',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 50
      };
    }
    return {
      width: '280px',
      top: '200px',
      left: '15vw',
      zIndex: 50
    };
  };

  const getSecondaryCardStyle = () => {
    const baseTop = screenSize.isSmallMobile ? '30vh' : (screenSize.isMobile ? '25vh' : '200px');
    return {
      width: screenSize.isSmallMobile ? '260px' : '280px',
      top: `calc(${baseTop} + ${cardHeight}px + ${screenSize.isSmallMobile ? '10px' : '20px'})`,
      left: screenSize.isMobile ? '10%' : '15vw',
      transform: screenSize.isMobile ? 'translateX(-50%)' : 'none',
      zIndex: 50
    };
  };

  return (
    <>
      {/* Primary Card */}
      <motion.div
        ref={primaryCardRef}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className={`fixed p-4 bg-white shadow-lg rounded-lg animated-card`}
        style={getPrimaryCardStyle()}
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

        {/* Process Type Badge */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-600/60 bg-blue-500/10 px-2 py-0.5 rounded-full">
            {step && getStepType(step)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3">
          {model}
        </p>

        {/* Agent Verified Badge */}
        <div className="flex items-center">
          <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded">
            Agent Verified
          </span>
        </div>
      </motion.div>

      {/* Secondary Card with Detailed Description */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ delay: 0.2 }}
        className={`fixed p-4 bg-white shadow-lg rounded-lg animated-card`}
        style={getSecondaryCardStyle()}
      >
        <div className="text-xs text-gray-500">
          <p className={`text-xs leading-relaxed mb-3 ${
            screenSize.isSmallMobile ? 'line-clamp-4' : ''
          }`}>
            {step && getDetailedDescription(step)}
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default AnimatedCard; 