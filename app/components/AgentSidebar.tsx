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
import { useChargers } from '../hooks/useChargers';

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
  const { chargers, loading, error, refresh } = useChargers();

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

  // Add polling effect
  useEffect(() => {
    // Initial fetch
    refresh();

    // Set up polling interval
    const interval = setInterval(() => {
      refresh();
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(interval);
  }, [refresh]);

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
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500">Error loading chargers</div>
          ) : (
            chargers.map((charger, index) => (
              <button
                key={charger.id_charger}
                onClick={() => setSelectedDevice(charger)}
                className={`w-full p-3 md:p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer text-left
                  ${selectedDevice?.id_charger === charger.id_charger
                    ? "bg-[#E8EDFF] border-[#2D4EC8]"
                    : "hover:bg-gray-50 border-gray-100"
                  }`}
              >
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#E8EDFF] flex items-center justify-center overflow-hidden">
                      <Image 
                        {...IMAGES[index >= 4 ? 'zapIcon2' : 'zapIcon']}
                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                        priority={true}
                        onError={(e) => {
                          console.error(`Failed to load image: ${IMAGES[index >= 4 ? 'zapIcon2' : 'zapIcon'].src}`);
                        }}
                        style={{ 
                          transform: index >= 4 
                            ? 'scale(1.8)'
                            : 'scale(1.8)'
                        }}
                      />
                    </div>
                    <Badge 
                      className="absolute -top-2 -left-2 px-1.5 py-0.5 text-[8px] md:text-[10px] font-bold text-black"
                    >
                      #{index + 1}
                    </Badge>
                    
                    {/* Status badge */}
                    {isOpen && !selectedDevice && (
                      <Badge 
                        className={`absolute -top-2 right-[-180px] md:right-[-280px] px-2 py-0.5 text-[8px] md:text-[10px] rounded-xl font-medium text-white
                          ${index + 1 === 2 
                            ? 'bg-[#9A99FF]' 
                            : 'bg-green-500'
                          }`}
                      >
                        {index + 1 === 2 ? 'maintenance' : 'active'}
                      </Badge>
                    )}
                  </div>
                  
                  {/* Content section */}
                  {isOpen && !selectedDevice && (
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">{charger.name}</h3>
                      <div className="flex items-center gap-1 text-[10px] md:text-xs text-gray-500">
                        <span className="truncate">{charger.model}</span>
                        <span>•</span>
                        <span className="truncate">{charger.location.address}</span>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-2 gap-2 md:gap-4 mt-3">
                        <div className="bg-[#F9FAFE] p-2 rounded-lg">
                          <p className="text-[8px] md:text-[10px] text-[#2D4EC8] font-medium opacity-40">
                            Transactions
                          </p>
                          <p className="text-sm md:text-base font-semibold opacity-60 text-center">
                            {charger.transactions.toLocaleString()}
                          </p>
                        </div>
                        <div className="bg-[#F9FAFE] p-2 rounded-lg">
                          <p className="text-[8px] md:text-[10px] text-[#2D4EC8] font-medium opacity-40">
                            Balance
                          </p>
                          <p className="text-sm md:text-base font-semibold opacity-60 text-center">
                            ${charger.balance_total.toLocaleString(undefined, {
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            })}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </button>
            ))
          )}

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