"use client";

import React, { useState, useEffect } from "react";
import { Badge } from "./ui/Badge";
import { ScrollArea } from "./ui/ScrollArea";
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap,           // Replace Icon1
  Battery,       // Replace Icon2
  Activity       // Replace Icon3
} from "lucide-react"; 
import { Charger } from "./DobiChart";
import Image from 'next/image';
import { motion, AnimatePresence } from "framer-motion";
import { IMAGES } from '../config/images';

const chargers = [
  {
    id_charger: "CHG-001",
    name: "Fast Charger A1",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 1200,
    cost_generated: 5000.75,
    income_generated: 15000.5,
    balance_total: 10000,
  },
  {
    id_charger: "CHG-002",
    name: "Eco Charger B3",
    model: "ABB Slow",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4567, longitude: -70.6723, address: "Providencia, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-01-15",
    status: "maintenance",
    transactions: 450,
    cost_generated: 2000.0,
    income_generated: 6500.0,
    balance_total: 4500.0,
  },
  {
    id_charger: "CHG-003",
    name: "Urban Charger C1",
    model: "ABB Slow",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.445, longitude: -70.6601, address: "Las Condes, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-02-01",
    status: "active",
    transactions: 320,
    cost_generated: 1500.0,
    income_generated: 4500.0,
    balance_total: 3000.0,
  },
  {
    id_charger: "CHG-004",
    name: "Eco Charger B4",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4472, longitude: -70.6765, address: "Ñuñoa, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-03-10",
    status: "active",
    transactions: 700,
    cost_generated: 3000.0,
    income_generated: 10000.0,
    balance_total: 7000.0,
  },
  {
    id_charger: "CHG-005",
    name: "Highway Charger D1",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4432, longitude: -70.6612, address: "Vitacura, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-04-05",
    status: "active",
    transactions: 950,
    cost_generated: 4000.0,
    income_generated: 14000.0,
    balance_total: 10000.0,
  },
  {
    id_charger: "CHG-006",
    name: "Green Charger G1",
    model: "ABB Slow",
    image: "data:image/png;base64,UklGRjKKAQBXRUJQVlA4IAKuAACQZASdASoABAAEPjEYiEQi...",
    location: { latitude: 37.7749, longitude: -122.4194, address: "San Francisco, CA, USA" },
    company_owner: "GreenTech SPA",
    creation_date: "2024-05-10",
    status: "maintenance",
    transactions: 600,
    cost_generated: 2500.0,
    income_generated: 8500.0,
    balance_total: 6000.0,
  },
  {
    id_charger: "CHG-007",
    name: "Green Charger G2",
    model: "ABB Fast",
    image: "data:image/png;base64,UklGRjKKAQBXRUJQVlA4IAKuAACQZASdASoABAAEPjEYiEQi...",
    location: { latitude: 37.774, longitude: -122.419, address: "Oakland, CA, USA" },
    company_owner: "GreenTech SPA",
    creation_date: "2024-06-20",
    status: "active",
    transactions: 800,
    cost_generated: 3000.0,
    income_generated: 12000.0,
    balance_total: 9000.0,
  },
];

interface AgentSidebarProps {
  selectedDevice: Charger | null;
  setSelectedDevice: (device: Charger | null) => void;
  hoveredDeviceId: string | null;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({ 
  selectedDevice,
  setSelectedDevice,
  hoveredDeviceId,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChevronClick = () => {
    if (selectedDevice) {
      // If there's a selected device, close it first
      setSelectedDevice(null);
    } else {
      // If no device is selected, toggle the sidebar
      setIsOpen(!isOpen);
    }
  };

  // Remove the auto-open effect
  // Instead, close the sidebar when device workflow opens
  useEffect(() => {
    if (selectedDevice) {
      setIsOpen(false);
    }
  }, [selectedDevice]);

  const hoveredDevice = chargers.find(charger => charger.id_charger === hoveredDeviceId);

  return (
    <motion.div
      initial={{ width: "72px" }}
      animate={{ width: isOpen && !selectedDevice ? "384px" : "100px" }}
      transition={{ duration: 0.3 }}
      className="fixed right-0 top-[64px] bottom-0 bg-white border-l border-gray-100 shadow-lg z-[60]"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <div className="sticky top-0 flex items-center justify-between p-4 border-b border-gray-100 bg-white">
        <button 
          onClick={handleChevronClick}
          className="p-2 rounded-full hover:bg-gray-100/80 transition-all"
          aria-label={selectedDevice ? "Close device workflow" : "Toggle agent sidebar"}
        >
          {isOpen && !selectedDevice ? <ChevronRight className="text-gray-600" /> : <ChevronLeft className="text-gray-600" />}
        </button>
      </div>

      {/* Always show the container with charger icons */}
      <div className="overflow-y-auto h-[calc(100%-65px)]">
        <div className="p-4 space-y-4">
          {chargers.map((charger, index) => (
            <button
              key={charger.id_charger}
              onClick={() => setSelectedDevice(charger)}
              className={`w-full p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer text-left
                ${selectedDevice?.id_charger === charger.id_charger
                  ? "bg-[#E8EDFF] border-[#2D4EC8]"
                  : "hover:bg-gray-50 border-gray-100"
                }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#E8EDFF] flex items-center justify-center overflow-hidden">
                    <Image 
                      {...IMAGES[index >= 4 ? 'zapIcon2' : 'zapIcon']}
                      className="w-8 h-8 object-contain"
                      priority={true}
                      onError={(e) => {
                        console.error(`Failed to load image: ${IMAGES[index >= 4 ? 'zapIcon2' : 'zapIcon'].src}`);
                      }}
                      style={{ 
                        transform: index >= 4 
                          ? 'scale(2.0)'
                          : ' scale(2)'
                      }}
                    />
                  </div>
                  <Badge 
                    className={`absolute -top-3 -left-4 px-2 py-0.5 text-[10px] font-bold text-black`}
                  >
                    #{index + 1}
                  </Badge>
                  
                  {/* Only show expanded content when sidebar is open and no device selected */}
                  {isOpen && !selectedDevice && (
                    <>
                      <Badge 
                        className={`absolute -top-3 right-[-200px] px-2 py-0.5 text-[10px] rounded-xl font-medium text-white
                          ${index + 1 === 2 
                            ? 'bg-[#9A99FF]' 
                            : 'bg-green-500'
                          }`}
                      >
                        {index + 1 === 2 ? 'maintenance' : 'active'}
                      </Badge>
                    </>
                  )}
                </div>
                
                {/* Only show expanded content when sidebar is open and no device selected */}
                {isOpen && !selectedDevice && (
                  <>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{charger.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>{charger.model}</span>
                        <span>•</span>
                        <span>{charger.location.address}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="bg-[#F9FAFE] p-2 rounded-lg">
                        <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Transactions</p>
                        <p className="text-lg font-semibold opacity-60">{charger.transactions}</p>
                      </div>
                      <div className="bg-[#F9FAFE] p-2 rounded-lg">
                        <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Balance</p>
                        <p className="text-lg font-semibold opacity-60">${charger.balance_total.toLocaleString()}</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </button>
          ))}

          {hoveredDevice && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-0 left-0 w-full p-4 bg-white shadow-lg rounded-lg"
            >
              <h3 className="font-medium text-gray-900">{hoveredDevice.name}</h3>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <span>{hoveredDevice.model}</span>
                <span>•</span>
                <span>{hoveredDevice.location.address}</span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-[#F9FAFE] p-2 rounded-lg">
                  <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Transactions</p>
                  <p className="text-lg font-semibold opacity-60">{hoveredDevice.transactions}</p>
                </div>
                <div className="bg-[#F9FAFE] p-2 rounded-lg">
                  <p className="text-xs text-[#2D4EC8] font-medium opacity-40">Balance</p>
                  <p className="text-lg font-semibold opacity-60">${hoveredDevice.balance_total.toLocaleString()}</p>
                </div>
              </div>
            </motion.div>
          )} 
        </div>
      </div>
    </motion.div>
  );
};

export default AgentSidebar;