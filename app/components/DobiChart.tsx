"use client";

import React, { useCallback } from "react";
import { ReactFlow, Background, Controls, useEdgesState, useNodesState, addEdge, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { StraightEdge, StepEdge, SmoothStepEdge } from "@xyflow/react";
import BubbleMap from "./BubbleMap";

const edgeTypes = {
  straight: StraightEdge,
  step: StepEdge,
  smoothstep: SmoothStepEdge,
};

const nodes = [
  { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { headerLabel: "RWA", label: "EV-Charger", description: "Transaction Received", number: 1 } },
  { id: "2", position: { x: 600, y: 50 }, type: "customNode", data: { headerLabel: "DBS", label: "DBS Accountability", description: "Logs financial & energy data", number: 2 } },
  { id: "3", position: { x: 600, y: 400 }, type: "customNode", data: { headerLabel: "AI Core", label: "DOBI-CORE AI", description: "Allocates profits & costs", number: 3 } },
  { id: "4", position: { x: 100, y: 400 }, type: "customNode", data: { headerLabel: "Security", label: "ZKP Secure Deposit", description: "Ensures tamper-proof fund transfers", number: 4 } },
  { id: "5", position: { x: 100, y: 800 }, type: "customNode", data: { headerLabel: "Smart Contract", label: "Dobprotocol Pool", description: "Stores & manages investor funds", number: 5 } },
  { id: "6", position: { x: 600, y: 800 }, type: "customNode", data: { headerLabel: "Tokenomics", label: "Token Distribution", description: "Profit distribution to token holders", number: 6 } },
];

const edges = [
  { id: "e1-2", source: "1", target: "2", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },
  { id: "e5-6", source: "5", target: "6", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },
  { id: "e2-3", source: "2", target: "3", type: "step", animated: true, sourceHandle: "right", targetHandle: "right", style: { stroke: "#2D4EC8", strokeWidth: 3, borderRadius: 10 } },
  { id: "e4-5", source: "4", target: "5", type: "step", animated: true, sourceHandle: "left", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3, borderRadius: 10 } },
];

// Custom node component
const CustomNode = ({ data }) => {
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
          {data.image && <img src={data.image} alt={data.label} className="w-16 h-16 object-contain" />}
          <div className="text-[#2D4EC8] font-bold text-md text-center">{data.label}</div>
          {data.number <= 3 && (
            <div className="absolute bottom-2 bg-[#B5C8F9] text-[#2D4EC8] font-bold px-4 py-1 text-sm rounded-full">TEE</div>
          )}
        </div>
      </div>
    </div>
  );
};

// ✅ Main DobiChart component - NOW Controlled by Navbar
export default function DobiChart({ activeTab }) {
  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges ?? []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  return (
    <div className="relative w-full h-screen overflow-hidden touch-none">
      {/* ✅ Render ReactFlow Chart OR BubbleMap based on activeTab from Navbar */}
      {activeTab === "architecture" ? (
        <ReactFlow
          nodes={nodesState}
          edges={edgesState}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          nodeTypes={{ customNode: CustomNode }}
          edgeTypes={edgeTypes}
        >
          <Background />
          <Controls />
        </ReactFlow>
      ) : (
        <BubbleMap />
      )}
    </div>
  );
}

// ✅ BubbleMap Component
function BubbleMap() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="w-32 h-32 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
        <img src="/DOBI_icon.png" alt="DOBI Icon" className="w-20 h-20 object-contain" />
      </div>
    </div>
  );
}