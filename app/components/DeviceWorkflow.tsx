"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { Charger } from './DobiChart';

interface DeviceWorkflowProps {
  selectedDevice: Charger;
  onClose: () => void;
}

// Simplified component with minimal functionality
export default function DeviceWorkflow({ selectedDevice, onClose }: DeviceWorkflowProps) {
  // Simple static nodes and edges
  const nodes: Node[] = [
    {
      id: '1',
      type: 'default',
      data: { label: 'Device Node' },
      position: { x: 250, y: 0 },
    }
  ];

  const edges: Edge[] = [];

  return (
    <div className="h-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        Close
      </button>
      
      <div className="w-full h-full">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            fitView
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
} 