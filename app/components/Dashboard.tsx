"use client";

import React, { useState } from 'react';
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
    <div className="flex-1 relative">
      {/* Tab Content */}
      {activeTab === "architecture" ? (
        <DobiChart activeTab={activeTab} />
      ) : (
        <div className="relative w-full h-full">
          {/* Main BubbleMap is always visible */}
          <BubbleMap 
            selectedChargerId={selectedDevice?.id_charger} 
            activeTab={activeTab}
          />
          
          <AgentSidebar
            setSelectedDevice={setSelectedDevice}
            selectedDevice={selectedDevice}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          
          {/* Device Workflow overlay */}
          {selectedDevice && (
            <div className="absolute inset-0 bg-white">
              <DeviceWorkflow
                selectedDevice={selectedDevice}
                onClose={() => setSelectedDevice(null)}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dashboard; 