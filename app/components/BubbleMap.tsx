"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Node,
  Edge,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Image from 'next/image';
import BackgroundScene from './BackgroundScene';

interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: string;
  isOverlayVisible: boolean;
  selectedView: string | null;
}

// Custom Device Node Component
const DeviceNode = ({ data }: { data: any }) => {
  return (
    <div className="w-16 h-16 rounded-full flex items-center justify-center cursor-pointer">
      <Image
        src="/icons/zap_icon.png"
        alt="Device"
        width={64}
        height={64}
        className="w-full h-full"
      />
    </div>
  );
};

// Custom Node Component for the central node
const BubbleLayoutNode = () => {
  return (
    <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center">
      <img src="/icons/dobi-icon.png" alt="Dobi" className="w-16 h-16" />
    </div>
  );
};

const nodeTypes = {
  bubbleLayout: BubbleLayoutNode,
  device: DeviceNode,
};

// Initial nodes setup with multiple devices
const initialNodes: Node[] = [
  {
    id: 'central',
    type: 'bubbleLayout',
    position: { x: 400, y: 300 },
    data: {},
    draggable: false,
  },
  {
    id: 'device-1',
    type: 'device',
    position: { x: 600, y: 200 },
    data: { label: 'Device 1' },
    draggable: true,
  },
  {
    id: 'device-2',
    type: 'device',
    position: { x: 600, y: 300 },
    data: { label: 'Device 2' },
    draggable: true,
  },
  {
    id: 'device-3',
    type: 'device',
    position: { x: 600, y: 400 },
    data: { label: 'Device 3' },
    draggable: true,
  },
  {
    id: 'device-4',
    type: 'device',
    position: { x: 200, y: 200 },
    data: { label: 'Device 4' },
    draggable: true,
  },
  {
    id: 'device-5',
    type: 'device',
    position: { x: 200, y: 300 },
    data: { label: 'Device 5' },
    draggable: true,
  },
  {
    id: 'device-6',
    type: 'device',
    position: { x: 200, y: 400 },
    data: { label: 'Device 6' },
    draggable: true,
  },
  {
    id: 'device-7',
    type: 'device',
    position: { x: 200, y: 500 },
    data: { label: 'Device 7' },
    draggable: true,
  },
];

// Simplified and enhanced edge styles for better visibility
const edgeStyles = {
  stroke: '#ffffff',
  strokeWidth: 4,
};

// Initial edges connecting all devices to central node
const initialEdges: Edge[] = [
  {
    id: 'edge-1',
    source: 'central',
    target: 'device-1',
    type: 'straight',    // Using 'straight' for diagonal lines
    style: edgeStyles,
    animated: true,     // Re-enable animation
  },
  {
    id: 'edge-2',
    source: 'central',
    target: 'device-2',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
  {
    id: 'edge-3',
    source: 'central',
    target: 'device-3',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
  {
    id: 'edge-4',
    source: 'central',
    target: 'device-4',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
  {
    id: 'edge-5',
    source: 'central',
    target: 'device-5',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
  {
    id: 'edge-6',
    source: 'central',
    target: 'device-6',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
  {
    id: 'edge-7',
    source: 'central',
    target: 'device-7',
    type: 'straight',
    style: edgeStyles,
    animated: true,
  },
];

const BubbleMap: React.FC<BubbleMapProps> = ({
  selectedChargerId,
  activeTab,
  isOverlayVisible,
  selectedView,
}) => {
  const [nodes, setNodes] = React.useState<Node[]>(initialNodes);
  const [edges, setEdges] = React.useState<Edge[]>(initialEdges);

  // Handle node drag
  const onNodeDrag = (_: React.MouseEvent, node: Node) => {
    setNodes((nds) =>
      nds.map((n) => {
        if (n.id === node.id) {
          return {
            ...n,
            position: node.position,
          };
        }
        return n;
      })
    );
  };

  return (
    <div className="w-full h-full relative">
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <BackgroundScene />
      </div>
      <ReactFlowProvider>
        <div className="absolute inset-0" style={{ zIndex: 10 }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeDrag={onNodeDrag}
            fitView
            panOnScroll
            panOnDrag
            zoomOnScroll={false}
            nodesDraggable={true}
            preventScrolling={false}
            minZoom={0.5}
            maxZoom={1.5}
            className="w-full h-full"
            snapToGrid={false}
            snapGrid={[1, 1]}
            defaultEdgeOptions={{
              type: 'straight',
              animated: true,
              style: edgeStyles,
            }}
            style={{ background: 'transparent' }}
          >
            {/* Remove the Background component to rely solely on BackgroundScene */}
            {/* <Background color="#E5E7EB" gap={16} /> */}
            <Controls showInteractive={false} />
          </ReactFlow>
        </div>
      </ReactFlowProvider>

      {/* Conditional Views */}
      {selectedView === 'chargerDetails' && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity duration-500">
          {/* Charger Details Content */}
        </div>
      )}

      {selectedView === 'dobichart' && (
        <div className="absolute inset-0 bg-white/90 backdrop-blur-md transition-opacity duration-500">
          {/* DobiChart Content */}
        </div>
      )}
    </div>
  );
};

export default BubbleMap;