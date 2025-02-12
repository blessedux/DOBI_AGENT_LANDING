"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import BackgroundScene from './BackgroundScene';

interface DeviceWorkflowProps {
  selectedDevice: Charger;
  onClose: () => void;
}

const DeviceWorkflow: React.FC<DeviceWorkflowProps> = ({ 
  selectedDevice, 
  onClose 
}) => {
  return (
    <div className="h-full w-full relative">
      {/* Background Scene */}
      <div className="absolute inset-0">
        <BackgroundScene />
      </div>

      {/* Frosty Glass Overlay */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-md z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 p-4">
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

        {/* New Chart Layout */}
        <div className="p-4">
          <div className="grid grid-cols-3 gap-4">
            {/* Example of chart elements */}
            <div className="col-span-1 bg-blue-200 p-4 rounded">
              Submit Purchase Order
            </div>
            <div className="col-span-2 bg-blue-100 p-4 rounded">
              Write Traveler
            </div>
            {/* Add more elements to mimic the chart */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceWorkflow; 