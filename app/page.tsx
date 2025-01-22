"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import DobiChart from "./components/DobiChart";
import AgentSidebar from "./components/AgentSidebar";
import LogsViewer from "./components/ui/LogsViewer";
import BackgroundScene from "./components/BackgroundScene";

export default function Home() {
  // Maintain active tab state
  const [activeTab, setActiveTab] = useState("architecture");
  
  // Maintain selected device state
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Persistent Background */}
      <BackgroundScene />

      {/* Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex relative z-10">
        {/* AgentSidebar */}
        <AgentSidebar setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice} />
        
        {/* Pass activeTab to DobiChart */}
        <DobiChart activeTab={activeTab} />
      </main>

      {/* LogsViewer - Positioned absolutely to overlay on top */}
      <div className="absolute bottom-4 right-4 z-20">
        <LogsViewer />
      </div>
    </div>
  );
}