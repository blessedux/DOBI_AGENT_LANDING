"use client";

import React, { useEffect, useCallback, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  ReactFlowInstance,
  ReactFlowProvider,
  useReactFlow,
  addEdge,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { X } from "lucide-react";
import { Charger } from './DobiChart';

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
  selectedDevice: Charger;
  onClose: () => void;
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

// Custom nodes for device workflow
const DeviceNode = ({ data }: { data: any }) => (
  <div className="p-4 rounded-xl bg-white shadow-lg border border-gray-100">
    <h3 className="font-semibold text-lg">{data.name}</h3>
    <div className="text-sm text-gray-500">{data.model}</div>
  </div>
);

const nodeTypes = {
  deviceNode: DeviceNode,
};

function Flow({ selectedDevice, onClose }: DeviceWorkflowProps) {
  const { setViewport } = useReactFlow();

  React.useEffect(() => {
    setViewport({ x: 0, y: 0, zoom: 1 });
  }, [setViewport]);

  const initialNodes = [
    {
      id: 'device-main',
      type: 'deviceNode',
      position: { x: window.innerWidth / 2 - 100, y: 100 },
      data: selectedDevice,
    },
    // Add more nodes for device workflow
  ];

  const initialEdges = [
    // Add edges for device workflow
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="h-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        Close
      </button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        className="bg-white"
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
}

// Define node data type
interface NodeData {
  label: string;
  status?: 'pending' | 'completed' | 'failed';
}

// Define custom node types
type CustomNode = Node<NodeData>;

export default function DeviceWorkflow({ 
  selectedDevice, 
  onClose 
}: DeviceWorkflowProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Define initial nodes with proper typing
  const initialNodes: CustomNode[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Start' },
      position: { x: 250, y: 0 },
    },
    // Add more nodes as needed
  ];

  // Define initial edges with proper typing
  const initialEdges: Edge[] = [
    // Add edges for device workflow
    // Example:
    // { id: 'e1-2', source: '1', target: '2', animated: true },
  ];

  // Initialize nodes and edges
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [setNodes, setEdges]);

  // Handle adding new edges
  const onConnect = (params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  };

  // Progress animation
  useEffect(() => {
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
  }, [activeStepIndex]);

  // Auto-sliding effect with 6-second intervals
  useEffect(() => {
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
  }, [setNodes, reactFlowInstance, activeStepIndex]); // Added activeStepIndex dependency

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
    <div className="h-full relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 px-4 py-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        Close
      </button>
      <div className="w-full h-[700px] rounded-lg overflow-hidden">
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            fitView
          >
            <Controls />
            <Background color="#aaa" gap={16} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
} 