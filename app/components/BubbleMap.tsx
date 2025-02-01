"use client";

import React from 'react';
import { useSpring, animated } from '@react-spring/web';
import type { Charger } from './DobiChart';  // Import the Charger type

// Define chargers data
const chargers: Charger[] = [
  {
    id_charger: "CHG-001",
    name: "Fast Charger A1",
    model: "ABB Fast",
    image: "",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 1200,
    cost_generated: 5000.75,
    income_generated: 15000.5,
    balance_total: 10000.25,
  },
  {
    id_charger: "CHG-002",
    name: "Eco Charger B3",
    model: "ABB Slow",
    image: "",
    location: { latitude: -33.4567, longitude: -70.6723, address: "Providencia, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-01-15",
    status: "maintenance",
    transactions: 450,
    cost_generated: 2000.0,
    income_generated: 6500.0,
    balance_total: 4500.0,
  },
  // ... add other chargers
];

interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: "architecture" | "devices";
}

export default function BubbleMap({ selectedChargerId, activeTab }: BubbleMapProps) {
  const styles = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 180, friction: 20 },
  });

  return (
    <div className="relative w-full h-full">
      <animated.div style={styles} className="w-full h-full flex items-center justify-center">
        <div className="relative w-[600px] h-[600px]">
          {/* Central DOBI Node */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#2D4EC8] rounded-full flex items-center justify-center text-white font-bold shadow-lg">
            DOBI
          </div>
          
          {/* Surrounding Nodes */}
          {chargers.map((charger, index) => {
            const angle = (index * (360 / chargers.length)) * (Math.PI / 180);
            const radius = 200; // Distance from center
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            
            return (
              <div
                key={charger.id_charger}
                className={`absolute w-16 h-16 rounded-full flex items-center justify-center text-white font-medium transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer
                  ${charger.status === 'active' ? 'bg-green-400' : 'bg-blue-400'}
                  ${selectedChargerId === charger.id_charger ? 'ring-4 ring-[#2D4EC8]' : ''}`}
                style={{
                  left: `calc(50% + ${x}px - 2rem)`,
                  top: `calc(50% + ${y}px - 2rem)`,
                }}
              >
                {charger.name.split(' ').pop()}
              </div>
            );
          })}
        </div>
      </animated.div>
    </div>
  );
}