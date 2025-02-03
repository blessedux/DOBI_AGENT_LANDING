"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactFlow, { 
  ReactFlowProvider, 
  Background, 
  Controls,
  MiniMap
} from 'reactflow';
import 'reactflow/dist/style.css';

interface Milestone {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'in_progress' | 'pending';
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Transaction Request",
    description: "Initial transaction request received from EV charger.",
    status: "completed"
  },
  {
    id: 2,
    title: "Validation",
    description: "Smart contract validates user credentials and available funds.",
    status: "completed"
  },
  {
    id: 3,
    title: "Energy Transfer Start",
    description: "Charging session initiated with confirmed parameters.",
    status: "in_progress"
  },
  {
    id: 4,
    title: "Usage Monitoring",
    description: "Real-time monitoring of energy consumption.",
    status: "in_progress"
  },
  {
    id: 5,
    title: "Data Recording",
    description: "Energy usage data recorded on blockchain.",
    status: "pending"
  },
  {
    id: 6,
    title: "Session Complete",
    description: "Charging session completed and verified.",
    status: "pending"
  },
  {
    id: 7,
    title: "Cost Calculation",
    description: "Final cost calculated based on usage and rates.",
    status: "pending"
  },
  {
    id: 8,
    title: "Payment Processing",
    description: "Transaction processed through smart contract.",
    status: "pending"
  },
  {
    id: 9,
    title: "Revenue Distribution",
    description: "Automatic distribution of funds to stakeholders.",
    status: "pending"
  },
  {
    id: 10,
    title: "Transaction Complete",
    description: "Final verification and transaction closure.",
    status: "pending"
  }
];

interface CustomNodeProps {
  data: {
    milestone: Milestone;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
  };
}

const CustomNode: React.FC<CustomNodeProps> = ({ data }) => {
  const { milestone, isHovered, onHover, onLeave } = data;
  
  return (
    <div
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${
          milestone.status === 'completed' 
            ? 'bg-green-500 border-green-400' 
            : milestone.status === 'in_progress'
              ? 'bg-blue-500 border-blue-400'
              : 'bg-gray-700 border-gray-600'
        }`}
        animate={{
          scale: isHovered ? 1.2 : 1,
          boxShadow: isHovered 
            ? '0 0 20px rgba(59, 130, 246, 0.5)' 
            : '0 0 0px rgba(59, 130, 246, 0)'
        }}
      />
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute z-50 top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-[-20px] 
              flex items-center gap-4 pointer-events-none"
            style={{ width: "max-content" }}
          >
            <motion.div
              className="p-4 bg-gray-900/90 backdrop-blur-sm rounded-lg shadow-xl 
                border border-gray-700/50 w-64"
              initial={{ x: 20 }}
              animate={{ x: 0 }}
            >
              <p className="text-gray-300 text-sm">{milestone.description}</p>
            </motion.div>

            <motion.div
              className="px-3 py-2 bg-blue-500/20 backdrop-blur-sm rounded-lg 
                shadow-xl border border-blue-500/30"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
            >
              <span className="text-blue-300 text-sm font-medium whitespace-nowrap">
                {milestone.title}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MilestoneChart = () => {
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  const nodes = milestones.map((milestone, index) => ({
    id: `${milestone.id}`,
    type: 'custom',
    position: { 
      x: 100 + (index * 150),
      y: 200 + (Math.sin(index * 0.6) * 50)
    },
    data: { 
      milestone,
      isHovered: hoveredMilestone === milestone.id,
      onHover: () => setHoveredMilestone(milestone.id),
      onLeave: () => setHoveredMilestone(null)
    }
  }));

  const nodeTypes = {
    custom: CustomNode
  };

  return (
    <ReactFlowProvider>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={[]}
          nodeTypes={nodeTypes}
          fitView
          minZoom={0.5}
          maxZoom={2}
          defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        >
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 1003 0 L 1002 1 L 993 1 L 992 2 L 986 2 L 985 3 L 980 3 L 979 4 L 974 4 L 973 5 L 970 5 L 969 6 L 966 6 L 965 7 L 962 7 L 961 8 L 959 8 L 958 9 L 956 9 L 955 10 L 953 10 L 952 11 L 951 11 L 950 12 L 948 12 L 947 13 L 946 13 L 945 14 L 943 14 L 942 15 L 941 15 L 939 17 L 938 17 L 936 19 L 935 19 L 932 22 L 931 22 L 927 26 L 927 27 L 924 30 L 924 31 L 922 33 L 922 34 L 920 36 L 920 37 L 919 38 L 919 40 L 918 41 L 918 42 L 917 43 L 917 45 L 916 46 L 916 48 L 915 49 L 915 66 L 916 67 L 916 69 L 91..."
              className="stroke-blue-400/30"
              strokeWidth="2"
              fill="none"
              strokeDasharray="4 6"
            />
          </svg>
          <Background color="#2D4EC8" gap={20} size={1} style={{ opacity: 0.2 }} />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
};

export default MilestoneChart;