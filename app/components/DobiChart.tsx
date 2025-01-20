"use client";

import React, { useCallback } from "react";
import { ReactFlow, Background, Controls, useEdgesState, useNodesState, addEdge, Handle, Position } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

// Define Spacing for Layout
const cardSpacingX = 350;
const cardSpacingY = 200;

// Define Workflows with Six Interconnected Cards
const workflows = {
  architecture: {
    name: "Architecture",
    nodes: [
      { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { label: "EV-Charger", description: "Transaction Received" } },
      { id: "2", position: { x: 100 + cardSpacingX, y: 50 }, type: "customNode", data: { label: "DBS Accountability", description: "Logs financial & energy data" } },
      { id: "3", position: { x: 100, y: 50 + cardSpacingY }, type: "customNode", data: { label: "Convert to DOB", description: "Fiat converted into DOB tokens" } },
      { id: "4", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY }, type: "customNode", data: { label: "DOBI-CORE AI", description: "Allocates profits & costs" } },
      { id: "5", position: { x: 100, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "ZKP Secure Deposit", description: "Ensures tamper-proof fund transfers" } },
      { id: "6", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "Profit Pool", description: "Stores & manages investor funds" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
    ],
  },
  devices: {
    name: "Devices",
    nodes: [
      { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { label: "Continuous Monitoring", description: "Real-time charger tracking" } },
      { id: "2", position: { x: 100 + cardSpacingX, y: 50 }, type: "customNode", data: { label: "Detect Maintenance Needs", description: "AI predicts failures" } },
      { id: "3", position: { x: 100, y: 50 + cardSpacingY }, type: "customNode", data: { label: "Manage Warranty", description: "Automates defect claims" } },
      { id: "4", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY }, type: "customNode", data: { label: "Predictive Analytics", description: "Optimizes energy efficiency" } },
      { id: "5", position: { x: 100, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "Social Media Reports", description: "Updates on maintenance" } },
      { id: "6", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "Alert System", description: "Sends automated alerts" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
    ],
  },
  details: {
    name: "Details",
    nodes: [
      { id: "1", position: { x: 100, y: 50 }, type: "customNode", data: { label: "EV Charger Details", description: "Model, location, status" } },
      { id: "2", position: { x: 100 + cardSpacingX, y: 50 }, type: "customNode", data: { label: "Owner Information", description: "Ehive SPA, investors" } },
      { id: "3", position: { x: 100, y: 50 + cardSpacingY }, type: "customNode", data: { label: "Transaction History", description: "Energy sessions, payments" } },
      { id: "4", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY }, type: "customNode", data: { label: "Maintenance Logs", description: "Service records" } },
      { id: "5", position: { x: 100, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "Charger Status", description: "Active / Maintenance" } },
      { id: "6", position: { x: 100 + cardSpacingX, y: 50 + cardSpacingY * 2 }, type: "customNode", data: { label: "Usage Reports", description: "Energy & revenue" } },
    ],
    edges: [
      { id: "e1-2", source: "1", target: "2", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
      { id: "e4-5", source: "4", target: "5", animated: true },
      { id: "e5-6", source: "5", target: "6", animated: true },
    ],
  },
};

// Custom Node Component
const CustomNode = ({ data }) => (
  <div className="relative">
    <Handle type="target" position={Position.Left} className="w-3 h-3 bg-blue-500 rounded-full" />
    <Card className="w-[220px] h-[180px] flex flex-col justify-center items-center shadow-lg border border-gray-300 bg-white">
      <CardHeader>
        <CardTitle className="text-center text-lg">{data.label}</CardTitle>
        <CardDescription className="text-center">{data.description}</CardDescription>
      </CardHeader>
      <CardContent />
    </Card>
    <Handle type="source" position={Position.Right} className="w-3 h-3 bg-blue-500 rounded-full" />
  </div>
);

export default function DobiChart({ selectedWorkflow = "architecture" }) {
  const workflowData = workflows[selectedWorkflow] || workflows["architecture"];

  const [nodes, setNodes, onNodesChange] = useNodesState(workflowData.nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflowData.edges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)), []);

  return (
    <div className="relative w-full h-screen overflow-hidden touch-none">
      <ReactFlow nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} fitView nodeTypes={{ customNode: CustomNode }}>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}