"use client";

import React, { useCallback } from "react";
import { ReactFlow, Background, Controls, useEdgesState, useNodesState, addEdge, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { StraightEdge, StepEdge, SmoothStepEdge } from '@xyflow/react';
import { BaseEdge, EdgeLabelRenderer } from "@xyflow/react";

// Custom Straight Edge to Force Visibility
const CustomStraightEdge = ({ id, sourceX, sourceY, targetX, targetY, style }) => {
  const edgePath = `M ${sourceX},${sourceY} H ${targetX}`;

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%)`,
            background: "white",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

// Edge Types
const edgeTypes = {
  straight: CustomStraightEdge, 
  step: StepEdge,
  smoothstep: SmoothStepEdge,
};

// Increase Spacing Between Cards
const cardSpacingX = 500;
const cardSpacingY = 350;

// Define Nodes with Only Left & Right Handles
const nodes = [
  { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { headerLabel: "RWA", label: "EV-Charger", description: "Transaction Received", number: 1 } },
  { id: "2", position: { x: 100 + cardSpacingX, y: 50 }, type: "customNode", data: { headerLabel: "DBS", label: "DBS Accountability", description: "Logs financial & energy data", number: 2 } },
  { id: "3", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY }, type: "customNode", data: { headerLabel: "AI Core", label: "DOBI-CORE AI", description: "Allocates profits & costs", number: 3 } },
  { id: "4", position: { x: 100, y: 50 + cardSpacingY }, type: "customNode", data: { headerLabel: "Security", label: "ZKP Secure Deposit", description: "Ensures tamper-proof fund transfers", number: 4 } },
  { id: "5", position: { x: 100, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { headerLabel: "Smart Contract", label: "Dobprotocol Pool", description: "Stores & manages investor funds", number: 5 } },
  { id: "6", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { headerLabel: "Tokenomics", label: "Token Distribution", description: "Profit distribution to token holders", number: 6 } },
];

// Define Edges with Left & Right Handles Only
const edges = [
  // 🔵 Previously forced straight lines → Now dynamic connections
  { id: "e1-2", source: "1", target: "2", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },
  { id: "e3-4", source: "3", target: "4", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },
  { id: "e5-6", source: "5", target: "6", type: "smoothstep", animated: true, sourceHandle: "right", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3 } },

  // 🔵 Keep L-Shaped Arrows as `step`
  { id: "e2-3", source: "2", target: "3", type: "step", animated: true, sourceHandle: "right", targetHandle: "right", style: { stroke: "#2D4EC8", strokeWidth: 3, borderRadius: 10 } },
  { id: "e4-5", source: "4", target: "5", type: "step", animated: true, sourceHandle: "left", targetHandle: "left", style: { stroke: "#2D4EC8", strokeWidth: 3, borderRadius: 10 } },
];

// Define Custom Node Component with Left & Right Handles Only
const CustomNode = ({ data }) => {
  return (
    <div className="relative flex flex-col items-center w-[300px]">
      {/* Label Above Card */}
      <div className="w-full bg-[#B5C8F9] text-[#2D4EC8] font-bold text-lg py-2 text-center rounded-t-lg">
        {data.headerLabel}
      </div>

      {/* Card Content */}
      <div className="relative w-full h-[250px] bg-[#B5C8F9] rounded-b-lg shadow-lg flex justify-center items-center p-3 z-10">
        
        {/* 🔥 Left Handle (Target & Source) */}
        <Handle 
          type="target" 
          position={Position.Left} 
          id="left" 
          isConnectable={true} 
          className="absolute -left-2 top-1/2 transform -translate-y-1/2" 
        />
        <Handle 
          type="source" 
          position={Position.Left} 
          id="left" 
          isConnectable={true} 
          className="absolute -left-2 top-1/2 transform -translate-y-1/2" 
        />

        {/* 🔥 Right Handle (Target & Source) */}
        <Handle 
          type="target" 
          position={Position.Right} 
          id="right" 
          isConnectable={true} 
          className="absolute -right-2 top-1/2 transform -translate-y-1/2" 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          id="right" 
          isConnectable={true} 
          className="absolute -right-2 top-1/2 transform -translate-y-1/2" 
        />

        {/* Inner White Content Box */}
        <div className="w-[260px] h-[200px] bg-white flex flex-col justify-between items-center shadow-md rounded-lg p-4 z-20">
          {/* Image */}
          {data.image && <img src={data.image} alt={data.label} className="w-16 h-16 object-contain" />}

          {/* Title */}
          <div className="text-[#2D4EC8] font-bold text-md text-center">
            {data.label}
          </div>

          {/* TEE Label */}
          {data.number <= 3 && (
            <div className="absolute bottom-2 bg-[#B5C8F9] text-[#2D4EC8] font-bold px-4 py-1 text-sm rounded-full">
              TEE
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main DobiChart Component
export default function DobiChart() {
  const [nodesState, setNodes, onNodesChange] = useNodesState(nodes);
  const [edgesState, setEdges, onEdgesChange] = useEdgesState(edges ?? []);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);
  console.log("Edges in ReactFlow:", edgesState);
  return (
    
    <div className="relative w-full h-screen overflow-hidden touch-none">
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
    </div>
  );
}