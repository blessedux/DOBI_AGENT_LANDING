"use client";

import React, { useEffect, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { X } from "lucide-react";

interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  action: string;
  technology: string;
  agent_verification: boolean;
  next_step: string | string[] | null;
}

interface DeviceWorkflowProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDevice: string;
}

const workflowData = {
  workflow: {
    steps: [
      {
        id: "step1",
        name: "Transaction Received - EV Charger",
        description: "The EV charger operates as a Real World Asset (RWA) and receives a transaction to start charging energy. Generates initial reports on energy usage and payment.",
        action: "Receive energy transaction and generate RWA reports",
        technology: "TEE",
        agent_verification: true,
        next_step: "step2"
      },
      {
        id: "step2",
        name: "DBS Accountability System",
        description: "The accountability system processes RWA reports, validates data for consistency, and ensures proper recording of the transaction.",
        action: "Validate RWA reports and process accounting data",
        technology: "TEE",
        agent_verification: true,
        next_step: "step2.5"
      },
      {
        id: "step2.5",
        name: "Convert to DOB Token",
        description: "The payment in fiat is converted to the DOB token using an on-ramp service.",
        action: "Convert fiat to DOB token",
        technology: "On-ramp Service",
        agent_verification: true,
        next_step: "step3"
      },
      {
        id: "step3",
        name: "DOBI-CORE Fuzzy AI Agent",
        description: "The DOBI-CORE AI agent analyzes the validated reports and prepares financial allocations: profit vs costs.",
        action: "Analyze reports and prepare allocations",
        technology: "Fuzzy AI",
        agent_verification: true,
        next_step: "step4"
      },
      {
        id: "step4",
        name: "ZKP - Zero Knowledge Proof",
        description: "Funds are deposited securely using a Zero Knowledge Proof system for privacy-preserving verification.",
        action: "Deposit funds securely",
        technology: "ZKP",
        agent_verification: true,
        next_step: "step5"
      },
      {
        id: "step5",
        name: "Dobprotocol Profit Pool - Smart Contract",
        description: "The funds are sent to the Dobprotocol profit pool, where the profit and costs are managed.",
        action: "Send funds to profit pool and manage allocations",
        technology: "Smart Contract",
        agent_verification: true,
        next_step: ["step6", "step7"]
      },
      {
        id: "step6",
        name: "Profit Distribution",
        description: "The profit (30%) is distributed proportionally to token holders in the Dobprotocol pool.",
        action: "Distribute profit to token holders",
        technology: "Smart Contract",
        agent_verification: true,
        next_step: null
      },
      {
        id: "step7",
        name: "Cost Allocation",
        description: "The costs (70%) are divided into fixed and variable costs. Fixed costs include rent, maintenance, and insurance, while variable costs cover energy usage.",
        action: "Allocate fixed and variable costs",
        technology: "Smart Contract",
        agent_verification: true,
        next_step: ["step8", "step9"]
      },
      {
        id: "step8",
        name: "Fixed Costs Management",
        description: "Manage fixed costs, including rent, maintenance, and insurance.",
        action: "Allocate fixed costs",
        technology: "Smart Contract",
        agent_verification: true,
        next_step: null
      },
      {
        id: "step9",
        name: "Variable Costs Management",
        description: "Manage variable costs based on the energy used during the charging session.",
        action: "Allocate variable costs",
        technology: "Smart Contract",
        agent_verification: true,
        next_step: null
      }
    ]
  }
};

export default function DeviceWorkflow({ isOpen, onClose, selectedDevice }: DeviceWorkflowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [progress, setProgress] = useState(0);

  // Initialize nodes and edges
  useEffect(() => {
    if (!isOpen) return;

    const steps = workflowData.workflow.steps;
    const ySpacing = 300;
    const leftOffset = 450;
    const startY = 150;

    const flowNodes: Node[] = steps.map((step, index) => ({
      id: step.id,
      type: 'custom',
      position: { x: leftOffset, y: startY + (index * ySpacing) },
      data: { 
        ...step,
        isActive: index === 0,
        progress: index === 0 ? 0 : 0,
      },
    }));

    // Create edges
    const flowEdges: Edge[] = steps.reduce((acc: Edge[], step) => {
      if (!step.next_step) return acc;

      const nextSteps = Array.isArray(step.next_step) 
        ? step.next_step 
        : [step.next_step];

      const edges = nextSteps.map((nextStep) => ({
        id: `${step.id}-${nextStep}`,
        source: step.id,
        target: nextStep,
        animated: true,
        style: { stroke: '#FFFFFF', strokeWidth: 2 },
      }));

      return [...acc, ...edges];
    }, []);

    setNodes(flowNodes);
    setEdges(flowEdges);

    // Initial viewport positioning
    if (reactFlowInstance) {
      reactFlowInstance.setViewport({
        x: -400,
        y: 0,
        zoom: 1
      });
    }
  }, [isOpen, setNodes, setEdges, reactFlowInstance]);

  // Progress animation
  useEffect(() => {
    if (!isOpen) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        // Update progress over 6 seconds (6000ms)
        // 100 updates / 60 intervals = ~1.67% per update
        const newProgress = prev + (100 / 60);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 100); // Update every 100ms

    // Clear interval when component unmounts or when card changes
    return () => clearInterval(progressInterval);
  }, [activeStepIndex, isOpen]);

  // Auto-sliding effect with 6-second intervals
  useEffect(() => {
    if (!isOpen) return;

    const slideInterval = setTimeout(() => {
      setActiveStepIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % workflowData.workflow.steps.length;
        setProgress(0); // Reset progress for new card
        
        setNodes((nds) =>
          nds.map((node, index) => ({
            ...node,
            data: {
              ...node.data,
              isActive: index === nextIndex,
              progress: index === nextIndex ? 0 : 0,
            }
          }))
        );

        if (reactFlowInstance) {
          const ySpacing = 300;
          const startY = 150;
          const nodeY = startY + (nextIndex * ySpacing);
          
          reactFlowInstance.setViewport({
            x: -400,
            y: -nodeY + window.innerHeight / 3,
            zoom: 1
          }, {
            duration: 1000
          });
        }

        return nextIndex;
      });
    }, 6000); // Exactly 6 seconds

    return () => clearTimeout(slideInterval);
  }, [isOpen, setNodes, reactFlowInstance, activeStepIndex]); // Added activeStepIndex dependency

  // Update the CustomNode component
  const CustomNode = ({ data }: { data: WorkflowStep & { isActive: boolean } }) => (
    <motion.div
      animate={{
        scale: data.isActive ? 1.1 : 0.95,
        boxShadow: data.isActive 
          ? "0 0 40px rgba(45, 78, 200, 0.4)" 
          : "0 4px 6px rgba(0, 0, 0, 0.1)",
        opacity: data.isActive ? 1 : 0.7,
      }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div 
        className={`bg-white rounded-lg p-6 w-[500px]`}
        style={{
          borderWidth: "2px",
          borderStyle: "solid",
          borderImage: data.isActive 
            ? `linear-gradient(
                90deg, 
                #2D4EC8 ${progress}%, 
                transparent ${progress}%
              ) 1` 
            : "none",
          borderColor: data.isActive ? "transparent" : "#e5e7eb",
        }}
      >
        <div className={`${
          data.isActive ? "bg-[#2D4EC8]" : "bg-gray-100"
        } text-white px-3 py-1 rounded-t-md text-sm mb-2`}>
          {data.technology}
        </div>
        <h3 className={`font-bold ${
          data.isActive ? "text-[#2D4EC8]" : "text-gray-700"
        } mb-2`}>
          {data.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{data.description}</p>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">{data.action}</span>
          {data.agent_verification && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
              ✓ Agent Verified
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
          animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
          exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
          className="fixed inset-0 z-[100] flex items-center bg-black/30"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900/80 rounded-xl w-[1600px] h-[800px] p-6 ml-8 flex gap-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 z-50 p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Left side - Battery Animation */}
            <div className="w-[400px] h-full relative rounded-lg overflow-hidden bg-gray-800/50">
              <iframe 
                src="https://my.spline.design/batterycharger-6e007fa859514441e3cf848216c8a650/"
                className="w-full h-full"
                style={{
                  border: 'none',
                  borderRadius: '8px',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Right side - Workflow */}
            <div className="flex-1">
              <h2 className="text-white text-xl mb-4">
                Workflow for Device: {selectedDevice}
              </h2>
              <div className="w-full h-[700px] rounded-lg overflow-hidden">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={{ custom: CustomNode }}
                  fitView={false}
                  className="bg-transparent"
                  defaultZoom={1}
                  minZoom={1}
                  maxZoom={1}
                  onInit={setReactFlowInstance}
                  zoomOnScroll={false}
                  zoomOnPinch={false}
                  zoomOnDoubleClick={false}
                >
                  <Background color="#2D4EC8" gap={20} size={1} style={{ opacity: 0.1 }} />
                  <Controls showZoom={false} className="text-white" />
                </ReactFlow>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 