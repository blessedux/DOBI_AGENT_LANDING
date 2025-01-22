"use client";

import React, { useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useEdgesState,
  useNodesState,
  addEdge,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import { StraightEdge, StepEdge, SmoothStepEdge } from "reactflow";
import BubbleMap from "./BubbleMap";
import { useTransition, animated } from "@react-spring/web";

interface DobiChartProps {
  activeTab: string;
}

export default function DobiChart({ activeTab }: DobiChartProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (activeTab !== "architecture") return;

    console.log("✅ DobiChart.tsx is rendering!");

    const architectureNodes = [
      { id: "1", data: { label: "Frontend" }, position: { x: 200, y: 100 }, type: "default" },
      { id: "2", data: { label: "Backend" }, position: { x: 400, y: 100 }, type: "default" },
      { id: "3", data: { label: "Database" }, position: { x: 300, y: 300 }, type: "default" },
      { id: "4", data: { label: "Blockchain Layer" }, position: { x: 500, y: 400 }, type: "default" },
    ];

    const architectureEdges = [
      { id: "e1-3", source: "1", target: "3", animated: true },
      { id: "e2-3", source: "2", target: "3", animated: true },
      { id: "e3-4", source: "3", target: "4", animated: true },
    ];

    setNodes(architectureNodes);
    setEdges(architectureEdges);
  }, [activeTab, setNodes, setEdges]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    [setEdges]
  );

  const transitions = useTransition(activeTab, {
    from: { opacity: 0, filter: "blur(10px)", transform: "scale(0.95)" },
    enter: { opacity: 1, filter: "blur(0px)", transform: "scale(1)" },
    leave: { opacity: 0, filter: "blur(10px)", transform: "scale(1.05)" },
    config: { tension: 200, friction: 20 },
  });

  return (
    <div className="relative w-full h-screen overflow-hidden touch-none">
      {/* Remove the gradient background div since we're using BackgroundScene */}
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
              fitView
              className="w-full h-full min-h-[500px] bg-transparent"
            >
              <Background 
                color="#2D4EC8" 
                gap={20} 
                size={1}
                style={{ opacity: 0.2 }} // Make the background pattern more subtle
              />
              <Controls />
            </ReactFlow>
          ) : (
            <BubbleMap />
          )}
        </animated.div>
      ))}
    </div>
  );
}