"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BubbleMap from "./BubbleMap";
import DobiChart, { Charger } from "./DobiChart";
import DeviceWorkflow from "./DeviceWorkflow";
import AgentSidebar from './AgentSidebar';

interface DashboardProps {
  activeTab: "architecture" | "devices";
  selectedDevice: Charger | null;
  setSelectedDevice: (device: Charger | null) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ 
  activeTab, 
  selectedDevice,
  setSelectedDevice 
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
    <div className="flex-1 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full h-full"
        >
          {activeTab === "architecture" ? (
            <DobiChart activeTab={activeTab} />
          ) : (
            <div className="relative w-full h-full">
              {/* Main BubbleMap */}
              <div className="relative z-20 flex-1 h-full min-h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 to-black">
                <BubbleMap 
                  selectedChargerId={selectedDevice?.id_charger} 
                  activeTab={activeTab}
                  isOverlayVisible={false}
                  selectedView={null}
                />
              </div>
              
              {/* Sidebar */}
              <div className="relative z-30">
                <AgentSidebar
                  setSelectedDevice={setSelectedDevice}
                  selectedDevice={selectedDevice}
                  isSidebarOpen={isSidebarOpen}
                  setIsSidebarOpen={setIsSidebarOpen}
                />
              </div>
              
              {/* Device Workflow overlay */}
              <AnimatePresence>
                {selectedDevice && (
                  <motion.div 
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, filter: "blur(10px)" }}
                    transition={{ duration: 0.2 }}
                    className="absolute inset-0 top-[64px] bg-white z-40"
                  >
                    <DeviceWorkflow
                      selectedDevice={selectedDevice}
                      onClose={() => setSelectedDevice(null)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default Dashboard; 