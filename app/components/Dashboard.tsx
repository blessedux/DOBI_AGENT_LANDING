"use client";

import React, { useState } from "react";
import AgentSidebar from "./AgentSidebar";
import BubbleMap from "./BubbleMap";
import DobiChart, { Charger } from "./DobiChart";
import MonitorFlowChart from "./MonitorFlowChart";
import BackgroundScene from "./BackgroundScene"; // Import the BackgroundScene component

interface DashboardProps {}

export default function Dashboard(props: DashboardProps) {
  const [activeTab, setActiveTab] = useState<"architecture" | "devices">("architecture");
  const [selectedDevice, setSelectedDevice] = useState<Charger | null>(null);

  const handleSelectCharger = (chargerId: string) => {
    const charger: Charger = {
      id_charger: chargerId,
      name: "",
      model: "",
      image: "",
      location: { latitude: 0, longitude: 0, address: "" },
      company_owner: "",
      creation_date: "",
      status: "",
      transactions: 0,
      cost_generated: 0,
      income_generated: 0,
      balance_total: 0,
    };
    setSelectedDevice(charger);
    setActiveTab("devices"); // Optionally switch to devices tab upon selection
  };

  return (
    <div className="relative w-full h-screen">
      {/* Persistent 3D Background */}
      <BackgroundScene />

      <div className="flex h-full">
        {/* Agent Sidebar */}
        <AgentSidebar
          setSelectedDevice={setSelectedDevice}
          selectedDevice={selectedDevice}
        />

        {/* Main Content Area */}
        <div className="flex-1 relative">
          {/* Tab Navigation */}
          <div className="flex justify-center space-x-4 p-4 bg-gray-900 text-white">
            <button
              onClick={() => setActiveTab("architecture")}
              className={`px-4 py-2 rounded ${
                activeTab === "architecture" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              Architecture
            </button>
            <button
              onClick={() => setActiveTab("devices")}
              className={`px-4 py-2 rounded ${
                activeTab === "devices" ? "bg-blue-600" : "bg-gray-700"
              }`}
            >
              Devices
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "architecture" ? (
            <DobiChart activeTab={activeTab} />
          ) : (
            <BubbleMap selectedChargerId={selectedDevice?.id_charger} />
          )}

          {/* Monitor Flow Chart */}
          {selectedDevice && (
            <MonitorFlowChart chargerId={selectedDevice.id_charger} />
          )}
        </div>
      </div>
    </div>
  );
} 