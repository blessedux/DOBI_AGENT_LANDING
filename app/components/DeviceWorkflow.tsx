"use client";

import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import BackgroundScene from './BackgroundScene';
import ReactFlow, { ReactFlowProvider, MarkerType, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

interface DeviceWorkflowProps {
  selectedDevice: Charger;
  onClose: () => void;
}

const nodes = [
  { id: '1', type: 'default', data: { label: 'Transaction Received - EV Charger' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'default', data: { label: 'DBS Accountability System' }, position: { x: 200, y: 100 } },
  { id: '3', type: 'default', data: { label: 'DOBI-CORE Fuzzy AI Agent' }, position: { x: 400, y: 200 } },
  { id: '4', type: 'default', data: { label: 'Convert to DOB Token' }, position: { x: 600, y: 300 } },
  { id: '5', type: 'default', data: { label: 'ZKP - Zero Knowledge Proof' }, position: { x: 800, y: 400 } },
  { id: '6', type: 'default', data: { label: 'Dobprotocol Profit Pool - Smart Contract' }, position: { x: 1000, y: 500 } },
  { id: '7', type: 'default', data: { label: 'Profit Distribution' }, position: { x: 1200, y: 600 } },
  { id: '8', type: 'default', data: { label: 'Cost Allocation' }, position: { x: 800, y: 600 } },
  { id: '9', type: 'default', data: { label: 'Fixed Costs Management' }, position: { x: 600, y: 700 } },
  { id: '10', type: 'default', data: { label: 'Variable Costs Management' }, position: { x: 1000, y: 700 } },
];

const edges = [
  { 
    id: 'e1-2', 
    source: '1', 
    target: '2', 
    animated: true, 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  { 
    id: 'e2-3', 
    source: '2', 
    target: '3', 
    animated: true, 
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e6-7',
    source: '6',
    target: '7',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e6-8',
    source: '6',
    target: '8',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e8-9',
    source: '8',
    target: '9',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  },
  {
    id: 'e8-10',
    source: '8',
    target: '10',
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed },
    style: { stroke: '#00796b', strokeWidth: 2 } 
  }
];

const nodeStyles = {
  borderRadius: '8px',
  padding: '10px',
  background: '#e0f7fa',
  border: '1px solid #00796b',
  color: '#004d40',
  fontSize: '14px',
  textAlign: 'center',
};

const CustomNode = ({ data }: { data: any }) => (
  <div style={nodeStyles}>
    <Handle type="target" position={Position.Top} />
    {data.label}
    <Handle type="source" position={Position.Bottom} />
  </div>
);

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

        {/* React Flow Chart */}
        <ReactFlowProvider>
          <div className="h-[calc(100vh-200px)] w-full">
            <ReactFlow 
              nodes={nodes.map(node => ({ ...node, type: 'customNode' }))} 
              edges={edges} 
              nodeTypes={{ customNode: CustomNode }}
              fitView
            />
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
};

export default DeviceWorkflow; 