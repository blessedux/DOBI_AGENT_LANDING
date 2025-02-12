"use client";

import React, { useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useEdgesState,
  useNodesState,
  addEdge,
  Handle,
  Position,
  Connection,
  Edge,
  Node,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import { StraightEdge, StepEdge, SmoothStepEdge } from "reactflow";
import BubbleMap from "./BubbleMap";
import { useTransition, animated } from "@react-spring/web";
import GlassmorphismWindow from "./ui/GlassmorphismWindow";
import Image from 'next/image';
import { AnimatePresence, motion } from "framer-motion";

interface CustomNodeData {
  headerLabel: string;
  label: string;
  description: string;
  number: number;
  image?: string;
}

const edgeTypes = {
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
};

const initialNodes: Node<CustomNodeData>[] = [
  { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { headerLabel: "RWA", label: "EV-Charger", description: "Transaction Received", number: 1 } },
  { id: "2", position: { x: 600, y: 50 }, type: "customNode", data: { headerLabel: "DBS", label: "DBS Accountability", description: "Logs financial & energy data", number: 2 } },
  { id: "3", position: { x: 600, y: 400 }, type: "customNode", data: { headerLabel: "AI Core", label: "DOBI-CORE AI", description: "Allocates profits & costs", number: 3 } },
  { id: "4", position: { x: 100, y: 400 }, type: "customNode", data: { headerLabel: "Security", label: "ZKP Secure Deposit", description: "Ensures tamper-proof fund transfers", number: 4 } },
  { id: "5", position: { x: 100, y: 800 }, type: "customNode", data: { headerLabel: "Smart Contract", label: "Dobprotocol Pool", description: "Stores & manages investor funds", number: 5 } },
  { id: "6", position: { x: 600, y: 800 }, type: "customNode", data: { headerLabel: "Tokenomics", label: "Token Distribution", description: "Profit distribution to token holders", number: 6 } },
];

const initialEdges: Edge[] = [
  { 
    id: "e1-2", 
    source: "1", 
    target: "2", 
    type: "smoothstep", 
    animated: true, 
    sourceHandle: "right", 
    targetHandle: "left", 
    style: { stroke: "#FFFFFF", strokeWidth: 3 } 
  },
  { 
    id: "e3-4", 
    source: "3", 
    target: "4", 
    type: "smoothstep", 
    animated: true, 
    sourceHandle: "right", 
    targetHandle: "left", 
    style: { stroke: "#FFFFFF", strokeWidth: 3 } 
  },
  { 
    id: "e5-6", 
    source: "5", 
    target: "6", 
    type: "smoothstep", 
    animated: true, 
    sourceHandle: "right", 
    targetHandle: "left", 
    style: { stroke: "#FFFFFF", strokeWidth: 3 } 
  },
  { 
    id: "e2-3", 
    source: "2", 
    target: "3", 
    type: "step", 
    animated: true, 
    sourceHandle: "right", 
    targetHandle: "right", 
    style: { stroke: "#FFFFFF", strokeWidth: 3, borderRadius: 10 } 
  },
  { 
    id: "e4-5", 
    source: "4", 
    target: "5", 
    type: "step", 
    animated: true, 
    sourceHandle: "left", 
    targetHandle: "left", 
    style: { stroke: "#FFFFFF", strokeWidth: 3, borderRadius: 10 } 
  },
];

const CustomNode = ({ data }: { data: CustomNodeData }) => {
  return (
    <div className="relative flex flex-col items-center w-[300px]">
      <div className="w-full bg-[#B5C8F9] text-[#2D4EC8] font-bold text-lg py-2 text-center rounded-t-lg">
        {data.headerLabel}
      </div>
      <div className="relative w-full h-[250px] bg-[#B5C8F9] rounded-b-lg shadow-lg flex justify-center items-center p-3 z-10">
        <Handle type="target" position={Position.Left} id="left" className="absolute -left-2 top-1/2 transform -translate-y-1/2" />
        <Handle type="source" position={Position.Left} id="left" className="absolute -left-2 top-1/2 transform -translate-y-1/2" />
        <Handle type="target" position={Position.Right} id="right" className="absolute -right-2 top-1/2 transform -translate-y-1/2" />
        <Handle type="source" position={Position.Right} id="right" className="absolute -right-2 top-1/2 transform -translate-y-1/2" />
        <div className="w-[260px] h-[200px] bg-white flex flex-col justify-between items-center shadow-md rounded-lg p-4 z-20">
          {data.image && (
            <div className="relative w-16 h-16">
              <Image
                src={data.image}
                alt={data.label}
                fill
                className="object-contain"
              />
            </div>
          )}
          <div className="text-[#2D4EC8] font-bold text-md text-center">{data.label}</div>
          <div className="text-gray-600 text-sm text-center">{data.description}</div>
          <div className="w-8 h-8 bg-[#2D4EC8] rounded-full flex items-center justify-center text-white">
            {data.number}
          </div>
        </div>
      </div>
    </div>
  );
};

interface DobiChartProps {
  activeTab: string;
  selectedDevice: Charger | null;
}

const nodeTypes: NodeTypes = {
  customNode: CustomNode,
};

export interface Charger {
  id_charger: string;
  name: string;
  model: string;
  image: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  company_owner: string;
  creation_date: string;
  status: string;
  transactions: number;
  cost_generated: number;
  income_generated: number;
  balance_total: number;
}

const DobiChart: React.FC<DobiChartProps> = ({ activeTab, selectedDevice }) => {
  console.log('DobiChart rendering with device:', selectedDevice?.id_charger);

  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const transitions = useTransition(activeTab, {
    from: { opacity: 0, filter: "blur(10px)", transform: "scale(0.95)" },
    enter: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
    leave: { opacity: 0, filter: "blur(10px)", transform: "scale(1.05)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="relative w-full h-full">
      {selectedDevice ? (
        <div className="absolute inset-0 bg-white z-50">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-xl font-semibold">Device Milestones</h2>
            <button 
              onClick={() => console.log('Selected device:', selectedDevice)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Debug Device State
            </button>
          </div>
          <MilestoneChart device={selectedDevice} />
        </div>
      ) : (
        <div className="relative w-full h-screen overflow-hidden touch-none">
          <GlassmorphismWindow />
          
          {transitions((styles, tab) => (
            <animated.div
              style={{
                ...styles,
                position: "absolute",
                width: "100%",
                height: "100%",
                visibility: tab === activeTab ? "visible" : "hidden",
              }}
            >
              {tab === "architecture" ? (
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  nodeTypes={nodeTypes}
                  edgeTypes={edgeTypes}
                  fitView
                  className="w-full h-full min-h-[500px] bg-transparent"
                >
                  <Background 
                    color="#2D4EC8" 
                    gap={20} 
                    size={1}
                    style={{ opacity: 0.2 }}
                  />
                  
                </ReactFlow>
              ) : (
                <BubbleMap 
                  activeTab={activeTab}
                  isOverlayVisible={true}
                  selectedView={null}
                  selectedChargerId={undefined}
                />
              )}
            </animated.div>
          ))}
        </div>
      )}
    </div>
  );
};
  
export default DobiChart;