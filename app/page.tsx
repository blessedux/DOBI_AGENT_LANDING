"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import DobiChart from "./components/DobiChart";
import AgentSidebar from "./components/AgentSidebar";
import LogsViewer from "./components/ui/LogsViewer";
import CentralNode from "./components/ui/CentralNode";

export default function Home() {
  // Maintain active tab state
  const [activeTab, setActiveTab] = useState("architecture");
  
  // Maintain selected device state
  const [selectedDevice, setSelectedDevice] = useState(null);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Pass activeTab & setActiveTab to Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex">
        {/* Pass setSelectedDevice & selectedDevice to AgentSidebar */}
        <AgentSidebar setSelectedDevice={setSelectedDevice} selectedDevice={selectedDevice} />
        {/* Pass activeTab to DobiChart */}
        <DobiChart activeTab={activeTab} />
      </main>
      
      <LogsViewer />
    </div>
  );
}