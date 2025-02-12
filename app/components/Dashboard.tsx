"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BubbleMap from "./BubbleMap";
import DobiChart, { Charger } from "./DobiChart";
import DeviceWorkflow from "./DeviceWorkflow";

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
  useEffect(() => {
    console.log('Dashboard state:', { 
      activeTab,
      selectedDevice: selectedDevice?.id_charger 
    });
  }, [activeTab, selectedDevice]);

  // Add effect to close milestone view when switching to architecture tab
  useEffect(() => {
    if (activeTab === "architecture") {
      setSelectedDevice(null);
    }
  }, [activeTab, setSelectedDevice]);

  console.log('Dashboard selectedDevice:', selectedDevice); // Debug log

  return (
    <div className="flex-1 relative overflow-hidden">
      {/* Base content with transitions */}
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
            <DobiChart 
              activeTab={activeTab} 
              selectedDevice={selectedDevice}
            />
          ) : (
            <div className="relative w-full h-full">
              <div className="w-full h-[calc(100vh-64px)] bg-gradient-to-br from-gray-900 to-black">
                <BubbleMap 
                  selectedChargerId={selectedDevice?.id_charger} 
                  activeTab={activeTab}
                  isOverlayVisible={false}
                  selectedView={null}
                />
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Device Workflow Overlay */}
      <AnimatePresence>
        {selectedDevice && activeTab === "devices" && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-[64px] left-0 right-0 bottom-0 z-[50]"
          >
            <DeviceWorkflow 
              selectedDevice={selectedDevice} 
              onClose={() => setSelectedDevice(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Dashboard; 