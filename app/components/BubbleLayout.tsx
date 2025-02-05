"use client";

import React from "react";
import { Charger } from "@/types/types";
import MilestoneRoadmap from "./ui/MilestoneRoadmap"; // New chart component

interface BubbleLayoutProps {
  children: React.ReactNode;
  isOverlayVisible?: boolean;
  selectedView?: "chargerDetails" | "dobichart" | null;
}

const BubbleLayout: React.FC<BubbleLayoutProps> = ({
  children,
  isOverlayVisible,
  selectedView,
}) => {
  return (
    <div className="relative">
      {/* Background Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md transition-opacity duration-500 ${
          isOverlayVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />
      
      {/* Main Content */}
      <div
        className={`relative z-10 transition-opacity duration-500 ${
          isOverlayVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        {children}

        {/* Conditionally Render Chart on Charger Selection */}
        {selectedView === "dobichart" && <MilestoneRoadmap />}
      </div>
    </div>
  );
};

export default BubbleLayout;