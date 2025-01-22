"use client";

import React, { useEffect, useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  MarkerType,
  Node,
  Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useSpring, animated } from "@react-spring/web";

interface MonitorFlowChartProps {
  chargerId: string;
}

interface Step {
  id: string;
  name: string;
  description: string;
  action: string;
  technology: string;
  agent_verification: boolean;
  next_step: string[] | string | null;
  maintenance_types?: {
    type: string;
    criteria: string;
    actions: string[];
  }[];
  criteria?: string[];
  capabilities?: string[];
  update_types?: string[];
}

interface MonitorData {
  charger_monitoring: {
    steps: Step[];
  };
}

// Sample monitor data (can be imported from a JSON file)
const monitorData: MonitorData = {
  "charger_monitoring": {
    "steps": [
      {
        "id": "step1",
        "name": "Continuous Monitoring",
        "description": "Monitor real-time performance and operational data of the EV charger.",
        "action": "Collect performance metrics (energy, temperature, usage, faults).",
        "technology": "Fuzzy AI",
        "agent_verification": true,
        "next_step": ["step2", "step3"]
      },
      {
        "id": "step2",
        "name": "Detect Maintenance Needs",
        "description": "Evaluate data to determine if preventive or reactive maintenance is required.",
        "action": "Trigger maintenance based on heuristics or anomaly detection.",
        "technology": "AI Heuristics",
        "agent_verification": true,
        "maintenance_types": [
          {
            "type": "Preventive",
            "criteria": "Scheduled intervals or component lifecycle.",
            "actions": [
              "Component inspection",
              "Replacement of consumables"
            ]
          },
          {
            "type": "Reactive",
            "criteria": "Immediate faults or failure detected.",
            "actions": [
              "Diagnostic of failure",
              "Replacement or repair"
            ]
          }
        ],
        "next_step": "step4"
      },
      {
        "id": "step3",
        "name": "Manage Warranty Claims",
        "description": "Automatically manage warranty processes for detected issues under warranty.",
        "action": "Submit and track warranty claims with manufacturers.",
        "technology": "Automated Warranty System",
        "agent_verification": true,
        "criteria": [
          "Warranty period still valid.",
          "Issue type covered under warranty."
        ],
        "next_step": "step4"
      },
      {
        "id": "step4",
        "name": "Predictive Analytics",
        "description": "Use historical and real-time data to predict future issues and optimize performance.",
        "action": "Generate predictive models for fault and performance optimization.",
        "technology": "Machine Learning",
        "agent_verification": true,
        "capabilities": [
          "Predict part failures.",
          "Optimize energy efficiency.",
          "Recommend proactive upgrades."
        ],
        "next_step": "step5"
      },
      {
        "id": "step5",
        "name": "Social Media Updates",
        "description": "Publish updates about the charger's performance, maintenance activities, and milestones.",
        "action": "Post real-time updates on X or other platforms.",
        "technology": "Social Media Bot",
        "agent_verification": true,
        "update_types": [
          "Maintenance completed notifications.",
          "Performance reports.",
          "Proactive user tips."
        ],
        "next_step": null
      }
    ]
  }
};

export default function MonitorFlowChart({ chargerId }: MonitorFlowChartProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  // Animated Styles for the MonitorFlowChart component
  const styles = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(20px)" },
    config: { tension: 180, friction: 20 },
  });

  useEffect(() => {
    const steps = monitorData.charger_monitoring.steps;

    // Create nodes
    const flowNodes: Node[] = steps.map((step, index) => ({
      id: step.id,
      type: 'default',
      position: { x: 300, y: index * 150 },
      data: {
        label: (
          <div className="p-4 bg-white rounded shadow">
            <h3 className="font-bold text-lg">{step.name}</h3>
            <p className="text-sm">{step.description}</p>
            <p className="text-xs text-gray-500">{step.action}</p>
            <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
              {step.technology}
            </span>
          </div>
        ),
      },
      style: {
        border: step.agent_verification ? '2px solid #4F46E5' : '2px solid #D1D5DB',
      }
    }));

    // Create edges
    const flowEdges: Edge[] = [];
    steps.forEach((step) => {
      if (Array.isArray(step.next_step)) {
        step.next_step.forEach((nextStepId) => {
          flowEdges.push({
            id: `e-${step.id}-${nextStepId}`,
            source: step.id,
            target: nextStepId,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
          });
        });
      } else if (step.next_step) {
        flowEdges.push({
          id: `e-${step.id}-${step.next_step}`,
          source: step.id,
          target: step.next_step,
          type: 'smoothstep',
          animated: true,
          markerEnd: { type: MarkerType.ArrowClosed },
        });
      }
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, []);

  return (
    <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-white border rounded shadow-lg m-4">
      <animated.div style={styles} className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={false}
          nodesConnectable={false}
          elementsSelectable={false}
          zoomOnScroll={false}
          panOnScroll={false}
          zoomOnPinch={false}
          zoomOnDoubleClick={false}
          minZoom={0.5}
          maxZoom={1.5}
          nodeTypes={{}}
        >
          <MiniMap 
            nodeColor={(node) => {
              switch (node.data.label.props.children[0].props.children) {
                case "Continuous Monitoring":
                  return "rgb(255, 0, 0)";
                default:
                  return "#eee";
              }
            }}
          />
          <Controls />
          <Background />
        </ReactFlow>
      </animated.div>
    </div>
  );
} 