"use client";

import React from "react";
import MilestoneRoadmap from "./ui/MilestoneRoadmap";
import { Charger } from "./DobiChart";

interface MilestoneChartProps {
  device: Charger;
}

const MilestoneChart: React.FC<MilestoneChartProps> = ({ device }) => {
  return (
    <div className="w-full h-full overflow-auto p-8 bg-white/60">
      <div className="max-w-7xl mx-auto h-full flex flex-col justify-center">
        <h2 className="text-2xl font-bold mb-8">
          Milestones for {device.name}
        </h2>
        <div className="flex-1 flex items-center">
          <MilestoneRoadmap device={device} />
        </div>
      </div>
    </div>
  );
};

export default MilestoneChart;