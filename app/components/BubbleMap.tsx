"use client";

import React, { useCallback } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Node,
  Edge,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import type { Charger } from './DobiChart';
import Image from 'next/image';

// Define chargers data
const chargers: Charger[] = [
  {
    id_charger: "CHG-001",
    name: "Fast Charger A1",
    model: "ABB Fast",
    image: "",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 1200,
    cost_generated: 5000.75,
    income_generated: 15000.5,
    balance_total: 10000.25,
  },
  {
    id_charger: "CHG-002",
    name: "Eco Charger B3",
    model: "ABB Slow",
    image: "",
    location: { latitude: -33.4567, longitude: -70.6723, address: "Providencia, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-01-15",
    status: "maintenance",
    transactions: 450,
    cost_generated: 2000.0,
    income_generated: 6500.0,
    balance_total: 4500.0,
  },
  // ... add other chargers
];

// Custom Node Component for DOBI center node
const DobiNode = ({ data }: { data: any }) => (
  <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-lg">
    <div className="w-full h-full p-3 rounded-full bg-white flex items-center justify-center">
      <Image 
        src="/icons/dobi-icon.png" 
        alt="DOBI"
        width={112}
        height={112}
        className="w-full h-full object-contain"
      />
    </div>
  </div>
);

// Custom Node Component for charger nodes
const ChargerNode = ({ data }: { data: any }) => (
  <div 
    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110
      ${data.status === 'active' ? 'bg-[#86efac]' : 'bg-[#a5b4fc]'}`}
    style={{ opacity: 0.8 }}
  >
    <div className="text-center">
      <div className="text-sm font-bold text-gray-800">
        {data.name.split(' ').pop()}
      </div>
      <div className="text-xs text-gray-600">
        {data.transactions} tx
      </div>
    </div>
  </div>
);

// Register custom nodes
const nodeTypes = {
  dobiNode: DobiNode,
  chargerNode: ChargerNode,
};

interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: "architecture" | "devices";
}

function Flow({ selectedChargerId, activeTab }: BubbleMapProps) {
  const { setViewport } = useReactFlow();
  const radius = 200;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Set initial viewport on mount
  React.useEffect(() => {
    setViewport({ x: 0, y: 0, zoom: 0.75 });
  }, [setViewport]);

  const initialNodes: Node[] = [
    {
      id: 'dobi-center',
      type: 'dobiNode',
      position: { x: centerX - 56, y: centerY - 56 },
      data: { label: 'DOBI' },
    },
    ...chargers.map((charger, index) => {
      const angle = (index * (360 / chargers.length)) * (Math.PI / 180);
      const x = centerX + Math.cos(angle) * radius - 32;
      const y = centerY + Math.sin(angle) * radius - 32;
      
      return {
        id: charger.id_charger,
        type: 'chargerNode',
        position: { x, y },
        data: { ...charger },
      };
    }),
  ];

  const initialEdges: Edge[] = chargers.map((charger) => ({
    id: `edge-${charger.id_charger}`,
    source: 'dobi-center',
    target: charger.id_charger,
    style: { 
      stroke: charger.status === 'active' ? '#86efac' : '#a5b4fc',
      strokeWidth: 2,
      opacity: 0.4,
    },
    type: 'straight',
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      fitView
      className="bg-white"
      minZoom={0.5}
      maxZoom={1.5}
    >
      <Controls />
      <Background color="#aaa" gap={16} />
    </ReactFlow>
  );
}

// Wrap the component with ReactFlowProvider
export default function BubbleMap(props: BubbleMapProps) {
  return (
    <div className="w-full h-full bg-white">
      <ReactFlowProvider>
        <Flow {...props} />
      </ReactFlowProvider>
    </div>
  );
}