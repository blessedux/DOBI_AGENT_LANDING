"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import MilestoneChart from './MilestoneChart';
import { Charger } from './DobiChart';

interface DeviceWorkflowProps {
  selectedDevice: Charger;
  onClose: () => void;
}

const DeviceWorkflow: React.FC<DeviceWorkflowProps> = ({ 
  selectedDevice, 
  onClose 
}) => {
  return (
    <div className="h-full bg-white-900/95 backdrop-blur-sm text-grey">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Device Workflow: {selectedDevice.id_charger}
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Milestone Chart */}
      <div className="h-[calc(100vh-200px)] w-full">
        <MilestoneChart />
      </div>
    </div>
  );
};

export default DeviceWorkflow; 