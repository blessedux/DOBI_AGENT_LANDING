"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import DobiChart, { Charger } from "./components/DobiChart";
import AgentSidebar from "./components/AgentSidebar";
import LogsViewer from "./components/ui/LogsViewer";
import BackgroundScene from "./components/BackgroundScene";
import BubbleMap from "./components/BubbleMap";
import DeviceWorkflow from "./components/DeviceWorkflow";
import MonitorFlowChart from "./components/MonitorFlowChart";

export default function Home() {
  // Maintain active tab state
  const [activeTab, setActiveTab] = useState<"architecture" | "devices">("architecture");
  
  // Maintain selected device state
  const [selectedDevice, setSelectedDevice] = useState<Charger | null>(null);

  // Maintain workflow state
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  // Handle workflow close
  const handleCloseWorkflow = () => {
    setIsWorkflowOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex flex-col min-h-screen relative">
        {/* Persistent Background */}
        <BackgroundScene />

        {/* Navbar */}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 flex relative z-10">
          {/* AgentSidebar */}
          <AgentSidebar 
            setSelectedDevice={setSelectedDevice} 
            selectedDevice={selectedDevice} 
          />
          
          {/* Pass activeTab to DobiChart */}
          <DobiChart activeTab={activeTab} />
        </main>

        {/* LogsViewer - Positioned absolutely */}
        <div className="absolute bottom-4 right-4 z-20">
          <LogsViewer />
        </div>
      </div>

      {/* Device Workflow - Outside of GlassmorphismProvider */}
      <DeviceWorkflow 
        isOpen={isWorkflowOpen} 
        onClose={handleCloseWorkflow} 
        selectedDevice={selectedDevice} 
      />

      {/* Monitor Flow Chart */}
      {selectedDevice && (
        <MonitorFlowChart chargerId={selectedDevice.id_charger} />
      )}
    </div>
  );
}