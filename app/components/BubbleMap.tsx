"use client";

import React, { useEffect, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  MarkerType,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import { useSpring, animated } from "@react-spring/web";
import CentralNode from "./ui/CentralNode";

// Charger devices
const chargers = [
  { id: "CHG-001", name: "Fast Charger A1" },
  { id: "CHG-002", name: "Eco Charger B3" },
  { id: "CHG-003", name: "Urban Charger C1" },
  { id: "CHG-004", name: "Eco Charger B4" },
  { id: "CHG-005", name: "Highway Charger D1" },
];

// Register custom node types
const nodeTypes = {
  centralNode: CentralNode,
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

    // Central DOBI Bubble
    const centralNode: Node = {
      id: "central",
      type: "centralNode",
      data: { label: "DOBI" },
      position: { x: centerX, y: centerY },
      draggable: true,
    };

    // Charger Bubbles arranged in a circle
    const chargerNodes: Node[] = chargers.map((charger, index) => ({
      id: charger.id,
      data: { label: charger.name },
      position: {
        x: centerX + Math.cos((index / chargers.length) * 2 * Math.PI) * 220,
        y: centerY + Math.sin((index / chargers.length) * 2 * Math.PI) * 220,
      },
      draggable: true,
      style: {
        width: "100px",
        height: "100px",
        backgroundColor: "#28A745",
        borderRadius: "50%",
        color: "white",
        textAlign: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "10px",
        border: "2px solid #1a752f",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      },
    }));

    const nodesData: Node[] = [centralNode, ...chargerNodes];

    const edgesData: Edge[] = chargers.map((charger) => ({
      id: `edge-${charger.id}`,
      source: "central",
      target: charger.id,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { 
        strokeWidth: 2, 
        stroke: "#2D4EC8",
      },
    }));

    setNodes(nodesData);
    setEdges(edgesData);
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