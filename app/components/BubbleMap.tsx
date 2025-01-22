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
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSpring, animated } from "@react-spring/web";
import CentralNode from "./ui/CentralNode";

// Charger devices (from JSON structure)
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
  // React Flow State
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [loading, setLoading] = React.useState(true);

  // Animated Styles for the entire BubbleMap component
  const styles = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.95)" },
    config: { tension: 180, friction: 20 },
  });

  // Initialize nodes and edges
  useEffect(() => {
    console.log("✅ BubbleMap.tsx is rendering!");
    console.log("Initializing BubbleMap...");

    // Define center to ensure nodes are within the viewport
    const centerX = 300;
    const centerY = 300;

    // Central DOBI Bubble
    const centralNode: Node = {
      id: "central",
      type: "centralNode",
      data: { label: "DOBI" },
      position: { x: centerX, y: centerY },
      draggable: true,
    };

    // Charger Bubbles arranged in a circle around the central bubble
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
      },
    }));

    // Combine central node and charger nodes
    const nodesData: Node[] = [centralNode, ...chargerNodes];

    // Connect Chargers to DOBI
    const edgesData: Edge[] = chargers.map((charger) => ({
      id: `edge-${charger.id}`,
      source: "central",
      target: charger.id,
      animated: true,
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 2, stroke: "#ccc" },
    }));

    setNodes(nodesData);
    setEdges(edgesData);
    setLoading(false);

    console.log("Nodes:", nodesData);
    console.log("Edges:", edgesData);
  }, [setNodes, setEdges]);

  // Handle node drag movement
  const handleNodesChange = useCallback(
    (changes) => {
      onNodesChange(changes);
    },
    [onNodesChange]
  );

  // Debugging check
  if (loading) return <div>Loading BubbleMap...</div>;

  // Render the map with correct size
  console.log("BubbleMap component is rendering...");

  return (
    <div
      className="relative w-full h-screen"
      style={{ width: "100vw", height: "100vh" }} // Ensures the container occupies the full viewport
    >
      <animated.div style={styles} className="w-full h-full">
      
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
        >
          <MiniMap />
          <Controls />
          <Background />
        </ReactFlow>
      </animated.div>
    </div>
  );
}