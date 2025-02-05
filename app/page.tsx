"use client";

import React, { useState, useEffect } from "react";
import Navbar from "./components/ui/Navbar";
import Dashboard from "@/components/Dashboard";
import BackgroundScene from "./components/BackgroundScene";
import type { Charger } from "@/components/DobiChart";
import LogsViewer from './components/ui/LogsViewer';
import 'reactflow/dist/style.css';
import AgentSidebar from "@/components/AgentSidebar";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"architecture" | "devices">("architecture");
  const [selectedDevice, setSelectedDevice] = useState<Charger | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Add debug log for state changes
  useEffect(() => {
    console.log('Page state updated:', {
      selectedDevice: selectedDevice?.id_charger,
      isSidebarOpen
    });
  }, [selectedDevice, isSidebarOpen]);

  console.log('Home page selectedDevice:', selectedDevice?.id_charger);

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
          <Dashboard 
            activeTab={activeTab}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />

          <AgentSidebar 
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            selectedDevice={selectedDevice}
            setSelectedDevice={setSelectedDevice}
          />
        </main>

        <LogsViewer />
      </div>
    </div>
  );
}