"use client";

import React, { useState, useEffect } from 'react';
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

const getNodePositions = (isMobile: boolean) => {
  if (isMobile) {
    return [
      { x: 150, y: 0 },    // Node 1
      { x: 150, y: 150 },  // Node 2
      { x: 150, y: 300 },  // Node 3
      { x: 150, y: 450 },  // Node 4
      { x: 150, y: 600 },  // Node 5
      { x: 150, y: 750 },  // Node 6
      { x: 150, y: 900 },  // Node 7
      { x: 150, y: 1050 }, // Node 8
      { x: 150, y: 1200 }, // Node 9
      { x: 150, y: 1350 }, // Node 10
    ];
  }
  
  // Desktop positions remain the same
  return [
    { x: 0, y: 0 },
    { x: 200, y: 100 },
    { x: 400, y: 200 },
    { x: 600, y: 300 },
    { x: 800, y: 400 },
    { x: 1000, y: 500 },
    { x: 1200, y: 600 },
    { x: 800, y: 600 },
    { x: 600, y: 700 },
    { x: 1000, y: 700 },
  ];
};

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const positions = getNodePositions(isMobile);
  
  const nodes = [
    // Update each node's position using the positions array
    {
      id: '1',
      type: 'default',
      data: {
        label: 'Transaction Received - EV Charger',
        milestone: {
          title: 'Transaction Received',
          model: 'The EV charger operates as a Real World Asset (RWA) and receives a transaction to start charging energy. Generates initial reports on energy usage and payment.',
          step: 1
        }
      },
      position: positions[0]
    },
    {
      id: '2',
      type: 'default',
      data: {
        label: 'DBS Accountability System',
        milestone: {
          title: 'DBS Accountability',
          model: 'System Check',
          step: 2
        }
      },
      position: positions[1]
    },
    {
      id: '3',
      type: 'default',
      data: {
        label: 'DOBI-CORE Fuzzy AI Agent',
        milestone: {
          title: 'AI Processing',
          model: 'DOBI-CORE',
          step: 3
        }
      },
      position: positions[2]
    },
    {
      id: '4',
      type: 'default',
      data: {
        label: 'Convert to DOB Token',
        milestone: {
          title: 'Convert to DOB Token',
          model: 'The payment in fiat is converted to the DOB token using an on-ramp service.',
          step: 4
        }
      },
      position: positions[3]
    },
    {
      id: '5',
      type: 'default',
      data: {
        label: 'ZKP - Zero Knowledge Proof',
        milestone: {
          title: 'ZKP - Zero Knowledge Proof',
          model: 'Funds are deposited securely using a Zero Knowledge Proof system for privacy-preserving verification.',
          step: 5
        }
      },
      position: positions[4]
    },
    {
      id: '6',
      type: 'default',
      data: {
        label: 'Dobprotocol Profit Pool - Smart Contract',
        milestone: {
          title: 'Dobprotocol Profit Pool',
          model: 'The funds are sent to the Dobprotocol profit pool, where the profit and costs are managed.',
          step: 6
        }
      },
      position: positions[5]
    },
    {
      id: '7',
      type: 'default',
      data: {
        label: 'Profit Distribution',
        milestone: {
          title: 'Profit Distribution',
          model: 'The profit (30%) is distributed proportionally to token holders in the Dobprotocol pool',
          step: 7
        }
      },
      position: positions[6]
    },
    {
      id: '8',
      type: 'default',
      data: {
        label: 'Cost Allocation',
        milestone: {
          title: 'Cost Allocation',
          model: 'The costs (70%) are divided into fixed and variable costs. Fixed costs include rent, maintenance, and insurance, while variable costs cover energy usage.',
          step: 8
        }
      },
      position: positions[7]
    },
    {
      id: '9',
      type: 'default',
      data: {
        label: 'Fixed Costs Management',
        milestone: {
          title: 'Fixed Costs Management',
          model: 'Manage fixed costs, including rent, maintenance, and insurance.',
          step: 9
        }
      },
      position: positions[8]
    },
    {
      id: '10',
      type: 'default',
      data: {
        label: 'Variable Costs Management',
        milestone: {
          title: 'Variable Costs Management',
          model: 'Manage variable costs based on the energy used during the charging session',
          step: 10
        }
      },
      position: positions[9]
    },
  ];

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
          <div className={`h-[calc(100vh-200px)] w-full ${isMobile ? 'overflow-y-auto' : ''}`}>
            <ReactFlow 
              nodes={nodes.map((node, index) => ({
                ...node,
                type: 'customNode',
                position: positions[index],
                data: {
                  ...node.data,
                  onHover: setHoveredMilestone
                }
              }))}
              edges={edges}
              nodeTypes={{ customNode: CustomNode }}
              fitView
              minZoom={isMobile ? 0.2 : 0.5}
              maxZoom={isMobile ? 0.8 : 1.5}
            />
          </div>
        </ReactFlowProvider>

        {/* Animated Card for Milestone */}
        {hoveredMilestone && (
          <AnimatedCard
            title={hoveredMilestone.title}
            model={hoveredMilestone.model}
            step={hoveredMilestone.step}
          />
        )}
      </div>
    </div>
  );
};

export default DeviceWorkflow; 