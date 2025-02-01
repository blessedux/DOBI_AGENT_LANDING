"use client";

import React, { useState } from "react";
import Navbar from "./components/ui/Navbar";
import AgentSidebar from "./components/AgentSidebar";
import Dashboard from "@/components/Dashboard";
import BackgroundScene from "./components/BackgroundScene";
import type { Charger } from "@/components/DobiChart";
import LogsViewer from './components/ui/LogsViewer';
import 'reactflow/dist/style.css';

export default function Home() {
  const [activeTab, setActiveTab] = useState<"architecture" | "devices">("architecture");
  const [selectedDevice, setSelectedDevice] = useState<Charger | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="relative">
      <div className="flex flex-col min-h-screen relative">
        <BackgroundScene />
        
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isSidebarOpen={isSidebarOpen}
        />

        <main className="flex-1 flex relative z-10">
          <AgentSidebar 
            setSelectedDevice={setSelectedDevice} 
            selectedDevice={selectedDevice} 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />
          
          <Dashboard 
            activeTab={activeTab}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />
        </main>

        <LogsViewer />
      </div>
    </div>
  );
}