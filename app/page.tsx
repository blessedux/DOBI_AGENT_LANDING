"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import DobiChart from "./components/DobiChart";
import { AgentSidebar } from "./components/agent-sidebar";

export default function Home() {
  const [selectedWorkflow, setSelectedWorkflow] = useState("architecture");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar selectedWorkflow={selectedWorkflow} setSelectedWorkflow={setSelectedWorkflow} />

      {/* Main Content */}
      <main className="flex-1">
        <AgentSidebar />
        <DobiChart selectedWorkflow={selectedWorkflow} />
      </main>
    </div>
  );
}