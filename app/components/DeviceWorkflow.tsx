"use client";

import React, { useState } from 'react';
import { Button } from "./ui/button";
import { X } from "lucide-react";
import BackgroundScene from './BackgroundScene';
import ReactFlow, { ReactFlowProvider, MarkerType, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import AnimatedCard from './AnimatedCard';
import { Charger } from './DobiChart';

interface MilestoneData {
  title: string;
  model: string;
  address: string;
  transactions: number;
  balance: number;
  step: number;
}
  

interface NodeData {
  label: string;
  milestone: MilestoneData;
}

interface DeviceWorkflowProps {
  selectedDevice: Charger;
  onClose: () => void;
}

const nodes = [
  {
    id: '1',
    type: 'default',
    data: {
      label: 'Transaction Received - EV Charger',
      milestone: {
        title: 'Transaction Received',
        model: 'Secure transaction processing through TEE environment',
        address: 'Transaction Processing',
        transactions: 100,
        balance: 5000,
        step: 1
      }
    },
    position: { x: 0, y: 0 }
  },
  {
    id: '2',
    type: 'default',
    data: {
      label: 'DBS Accountability System',
      milestone: {
        title: 'DBS Accountability',
        model: 'System Check',
        address: 'Verification Process',
        transactions: 150,
        balance: 7500,
        step: 2
      }
    },
    position: { x: 200, y: 100 }
  },
  {
    id: '3',
    type: 'default',
    data: {
      label: 'DOBI-CORE Fuzzy AI Agent',
      milestone: {
        title: 'AI Processing',
        model: 'DOBI-CORE',
        address: 'AI Verification',
        transactions: 200,
        balance: 10000,
        step: 3
      }
    },
    position: { x: 400, y: 200 }
  },
  {
    id: '4',
    type: 'default',
    data: {
      label: 'Convert to DOB Token',
      milestone: {
        title: 'Convert to DOB Token',
        model: 'The payment in fiat is converted to the DOB token using an on-ramp service.',
        address: 'Token Conversion',
        transactions: 250,
        balance: 12500,
        step: 4
      }
    },
    position: { x: 600, y: 300 }
  },
  {
    id: '5',
    type: 'default',
    data: {
      label: 'ZKP - Zero Knowledge Proof',
      milestone: {
        title: 'ZKP - Zero Knowledge Proof',
        model: 'Funds are deposited securely using a Zero Knowledge Proof system for privacy-preserving verification.',
        address: 'Secure Deposit',
        transactions: 300,
        balance: 15000,
        step: 5
      }
    },
    position: { x: 800, y: 400 }
  },
  {
    id: '6',
    type: 'default',
    data: {
      label: 'Dobprotocol Profit Pool - Smart Contract',
      milestone: {
        title: 'Dobprotocol Profit Pool',
        model: 'The funds are sent to the Dobprotocol profit pool, where the profit and costs are managed.',
        address: 'Smart Contract',
        transactions: 350,
        balance: 17500,
        step: 6
      }
    },
    position: { x: 1000, y: 500 }
  },
  {
    id: '7',
    type: 'default',
    data: {
      label: 'Profit Distribution',
      milestone: {
        title: 'Profit Distribution',
        model: 'The profit (30%) is distributed proportionally to token holders in the Dobprotocol pool',
        address: 'Distribution',
        transactions: 400,
        balance: 20000,
        step: 7
      }
    },
    position: { x: 1200, y: 600 }
  },
  {
    id: '8',
    type: 'default',
    data: {
      label: 'Cost Allocation',
      milestone: {
        title: 'Cost Allocation',
        model: 'The costs (70%) are divided into fixed and variable costs. Fixed costs include rent, maintenance, and insurance, while variable costs cover energy usage.',
        address: 'Allocation',
        transactions: 450,
        balance: 22500,
        step: 8
      }
    },
    position: { x: 800, y: 600 }
  },
  {
    id: '9',
    type: 'default',
    data: {
      label: 'Fixed Costs Management',
      milestone: {
        title: 'Fixed Costs Management',
        model: 'Manage fixed costs, including rent, maintenance, and insurance.',
        address: 'Fixed Costs',
        transactions: 500,
        balance: 25000,
        step: 9
      }
    },
    position: { x: 600, y: 700 }
  },
  {
    id: '10',
    type: 'default',
    data: {
      label: 'Variable Costs Management',
      milestone: {
        title: 'Variable Costs Management',
        model: 'Manage variable costs based on the energy used during the charging session',
        address: 'Variable Costs',
        transactions: 550,
        balance: 27500,
        step: 10
      }
    },
    position: { x: 1000, y: 700 }
  },
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

interface CustomNodeProps {
  data: NodeData & {
    onHover: (milestone: MilestoneData | null) => void;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const handleMouseEnter = () => {
    if (data.milestone && data.onHover) {
      data.onHover(data.milestone);
    }
  };

  const handleMouseLeave = () => {
    if (data.onHover) {
      data.onHover(null);
    }
  };

  return (
    <div
      style={nodeStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Handle type="target" position={Position.Top} />
      {data.label}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const DeviceWorkflow: React.FC<DeviceWorkflowProps> = ({ 
  selectedDevice, 
  onClose 
}) => {
  const [hoveredMilestone, setHoveredMilestone] = useState<MilestoneData | null>(null);

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
              nodes={nodes.map(node => ({
                ...node,
                type: 'customNode',
                data: {
                  ...node.data,
                  onHover: setHoveredMilestone
                }
              }))}
              edges={edges}
              nodeTypes={{ customNode: CustomNode }}
              fitView
            />
          </div>
        </ReactFlowProvider>

        {/* Animated Card for Milestone */}
        {hoveredMilestone && (
          <AnimatedCard
            title={hoveredMilestone.title}
            model={hoveredMilestone.model}
            address={hoveredMilestone.address}
            transactions={hoveredMilestone.transactions}
            balance={hoveredMilestone.balance}
            step={hoveredMilestone.step}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceWorkflow; 