"use client";

import React, { useState } from "react";
import BubbleMap from "./BubbleMap";
import DobiChart, { Charger } from "./DobiChart";
import MonitorFlowChart from "./MonitorFlowChart";

interface DashboardProps {
  selectedDevice?: { id_charger: string } | null;
  activeTab: "architecture" | "devices";
}

export default function Dashboard({ activeTab, selectedDevice }: DashboardProps) {
  return (
    <div className="flex-1 relative">
      {/* Tab Content */}
      {activeTab === "architecture" ? (
        <DobiChart activeTab={activeTab} />
      ) : (
        <BubbleMap 
          selectedChargerId={selectedDevice?.id_charger} 
          activeTab={activeTab}
        />
      )}

      {/* Monitor Flow Chart */}
      {selectedDevice && (
        <MonitorFlowChart chargerId={selectedDevice.id_charger} />
      )}
    </div>
  );
} 