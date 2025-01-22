"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import DobiChart from "./components/DobiChart";
import AgentSidebar from "./components/AgentSidebar";
import LogsViewer from "./components/ui/LogsViewer";

export default function Home() {
  // ✅ Maintain active tab state
  const [activeTab, setActiveTab] = useState("architecture");

  return (
    <div className="flex flex-col min-h-screen">
      {/* ✅ Pass activeTab & setActiveTab to Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 flex">
        <AgentSidebar />
        {/* ✅ Pass activeTab to DobiChart */}
        <DobiChart activeTab={activeTab} />
      </main>
      
      <LogsViewer />
    </div>
  );
}