"use client";

import React, { useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  EdgeTypes,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSpring, animated } from "@react-spring/web";
import CentralNode from "./ui/CentralNode";
import Image from "next/image";

// Charger data grouped by company
const chargerGroups = {
  "Ehive SPA": [
    { id: "CHG-001", name: "Fast Charger A1", transactions: 1200, balance: 10000.25 },
    { id: "CHG-002", name: "Eco Charger B3", transactions: 450, balance: 4500.00 },
    { id: "CHG-003", name: "Urban Charger C1", transactions: 320, balance: 3000.00 },
    { id: "CHG-004", name: "Eco Charger B4", transactions: 700, balance: 7000.00 },
    { id: "CHG-005", name: "Highway Charger D1", transactions: 950, balance: 10000.00 },
  ],
  "GreenTech SPA": [
    { id: "CHG-006", name: "Green Charger G1", transactions: 600, balance: 6000.00 },
    { id: "CHG-007", name: "Green Charger G2", transactions: 800, balance: 9000.00 },
  ],
};

// Custom central node component
const CustomCentralNode = () => (
  <div className="flex flex-col items-center justify-center w-full h-full">
    <div className="text-2xl font-bold mb-2">DOBI</div>
    <div className="relative w-16 h-16">
      <Image
        src="/icons/dobi-icon.png"
        alt="DOBI Icon"
        fill
        className="object-contain"
        style={{ borderRadius: "50%" }}
      />
    </div>
  </div>
);

const nodeTypes = {
  centralNode: CustomCentralNode,
};

// Add this edge type configuration at the top level
const edgeTypes = {
  custom: {
    style: {
      stroke: '#FFFFFF',
      strokeWidth: 3,
    },
  },
};

export default function BubbleMap() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = React.useState(true);

  const styles = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 180, friction: 20 },
  });

  useEffect(() => {
    console.log("✅ BubbleMap.tsx is rendering!");

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    // Central DOBI Node
    const centralNode: Node = {
      id: "central",
      type: "centralNode",
      data: { label: "DOBI" },
      position: { x: centerX, y: centerY },
      style: {
        width: 150,
        height: 150,
        borderRadius: "50%",
        backgroundColor: "#2D4EC8",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "4px solid #B5C8F9",
      },
    };

    let allNodes: Node[] = [centralNode];
    let allEdges: Edge[] = [];

    // Create nodes and edges for each company group
    Object.entries(chargerGroups).forEach(([company, chargers], groupIndex) => {
      const isLeftGroup = groupIndex === 0;
      const baseX = isLeftGroup ? centerX - 400 : centerX + 400;
      
      chargers.forEach((charger, index) => {
        const chargerNode: Node = {
          id: charger.id,
          data: { 
            label: charger.name,
            transactions: charger.transactions,
            balance: charger.balance,
            company: company,
          },
          position: {
            x: baseX + (isLeftGroup ? -100 : 100),
            y: centerY + (index * 120) - (chargers.length * 60) + 100,
          },
          style: {
            width: 180,
            padding: "15px",
            backgroundColor: isLeftGroup ? "#28A745" : "#2D4EC8",
            color: "white",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        };
        allNodes.push(chargerNode);

        // Simplified edge configuration
        allEdges.push({
          id: `edge-${charger.id}`,
          source: "central",
          target: charger.id,
          type: "default",
          animated: true,
          style: {
            stroke: "#FFFFFF",
            strokeWidth: 3,
          },
        });
      });
    });

    setNodes(allNodes);
    setEdges(allEdges);
    setLoading(false);
  }, [setNodes, setEdges]);

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  if (loading) return <div>Loading BubbleMap...</div>;

  return (
    <div className="relative w-full h-full">
      <animated.div style={styles} className="w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          panOnScroll
          zoomOnScroll
          zoomOnPinch
          zoomOnDoubleClick
          minZoom={0.5}
          maxZoom={2}
          nodeTypes={nodeTypes}
          className="bg-transparent"
          defaultEdgeOptions={{
            type: "default",
            animated: true,
            style: {
              stroke: "#FFFFFF",
              strokeWidth: 3,
            },
          }}
        >
          <Background 
            color="#2D4EC8" 
            gap={20} 
            size={1}
            style={{ opacity: 0.2 }}
          />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </animated.div>
    </div>
  );
}