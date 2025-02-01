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
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSpring, animated } from "@react-spring/web";
import CentralNode from "./ui/CentralNode";
import GlassmorphismWindow from "./ui/GlassmorphismWindow";

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

const nodeTypes = {
  centralNode: CentralNode,
};

// Add interface for props
interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: "architecture" | "devices";
}

export default function BubbleMap({ selectedChargerId, activeTab }: BubbleMapProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = React.useState(true);
  const [reactFlowInstance, setReactFlowInstance] = React.useState<ReactFlowInstance | null>(null);

  const styles = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 180, friction: 20 },
  });

  useEffect(() => {
    console.log("✅ BubbleMap.tsx is rendering!");

    // Calculate viewport center
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const centerX = 0; // This will be adjusted by the viewport positioning
    const centerY = 0; // This will be adjusted by the viewport positioning

    // Central DOBI Node - Remove style overrides that might conflict
    const centralNode: Node = {
      id: "central",
      type: "centralNode",
      data: { label: "DOBI Agent" },
      position: { x: 0, y: 0 },
      
    };

    // Adjust charger positions relative to center
    let allNodes: Node[] = [centralNode];
    let allEdges: Edge[] = [];

    Object.entries(chargerGroups).forEach(([company, chargers], groupIndex) => {
      const isLeftGroup = groupIndex === 0;
      const baseX = isLeftGroup ? -500 : 500; // Positions relative to center
      
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
            y: (index * 120) - (chargers.length * 60),
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

    // Center the viewport on the central node
    if (reactFlowInstance) {
      reactFlowInstance.setViewport({
        x: viewportWidth / 2,
        y: viewportHeight / 2,
        zoom: 0.75
      });
    }

    setLoading(false);
  }, [setNodes, setEdges, reactFlowInstance]);

  const handleNodesChange = useCallback(
    (changes: any) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  if (loading) return <div>Loading BubbleMap...</div>;

  return (
    <div className="relative w-full h-full">
      <GlassmorphismWindow activeTab={activeTab} />
      <animated.div style={styles} className="w-full h-full relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={onEdgesChange}
          fitView={false}
          className="bg-transparent"
          defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
          minZoom={0.5}
          maxZoom={1.5}
          onInit={setReactFlowInstance}
          nodeTypes={nodeTypes}
        >
          <Background color="#2D4EC8" gap={20} size={1} style={{ opacity: 0.1 }} />
          <Controls className="text-white" />
        </ReactFlow>
      </animated.div>
    </div>
  );
}