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
  Handle,
  Position,
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

const CustomNode = ({ data }: { data: any }) => (
  <div className="w-24 h-24 rounded-full flex items-center justify-center">
    <Handle type="target" position={Position.Left} style={{ visibility: 'hidden' }} />
    <Image
      src="/icons/zap_icon.png"
      alt="Device"
      layout="fill"
      objectFit="cover"
      className="rounded-full"
    />
    <Handle type="source" position={Position.Right} style={{ visibility: 'hidden' }} />
  </div>
);

const BubbleLayoutNode = () => (
  <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
    <Handle type="source" position={Position.Left} style={{ visibility: 'hidden' }} />
    <img src="/icons/dobi-icon.png" alt="Dobi" className="w-28 h-28 rounded-full" />
    <Handle type="target" position={Position.Right} style={{ visibility: 'hidden' }} />
  </div>
);

const nodeTypes = {
  bubbleLayout: BubbleLayoutNode,
  customNode: CustomNode,
};

// Custom Device Node Component
const DeviceNode = ({ data }: { data: any }) => {
  return (
    <div className="w-24 h-24 rounded-full flex items-center justify-center cursor-pointer">
      <Image
        src="/icons/zap_icon.png"
        alt="Device"
        width={80}
        height={80}
        className="w-full h-full"
      />
    </div>
  );
};

// Initial nodes setup with multiple devices
const initialNodes: Node[] = [
  {
    id: 'central',
    type: 'bubbleLayout',
    position: { x: 400, y: 400 },
    data: {},
    draggable: false,
  },
  {
    id: 'device-1',
    type: 'customNode',
    position: { x: 600, y: 200 },
    data: { label: 'Device 1' },
    draggable: true,
  },
  {
    id: 'device-2',
    type: 'customNode',
    position: { x: 600, y: 300 },
    data: { label: 'Device 2' },
    draggable: true,
  },
  {
    id: 'device-3',
    type: 'customNode',
    position: { x: 600, y: 400 },
    data: { label: 'Device 3' },
    draggable: true,
  },
  {
    id: 'device-4',
    type: 'customNode',
    position: { x: 200, y: 200 },
    data: { label: 'Device 4' },
    draggable: true,
  },
  {
    id: 'device-5',
    type: 'customNode',
    position: { x: 200, y: 300 },
    data: { label: 'Device 5' },
    draggable: true,
  },
  {
    id: 'device-6',
    type: 'customNode',
    position: { x: 200, y: 400 },
    data: { label: 'Device 6' },
    draggable: true,
  },
  {
    id: 'device-7',
    type: 'customNode',
    position: { x: 200, y: 500 },
    data: { label: 'Device 7' },
    draggable: true,
  },
];

// Simplified and enhanced edge styles for better visibility
const edgeStyles = {
  stroke: '#ffffff',
  strokeWidth: 2,
};

// Initial edges connecting all devices to central node
const initialEdges: Edge[] = [
  {
    id: 'e1',
    source: 'central',
    target: 'device-1',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e2',
    source: 'central',
    target: 'device-2',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e3',
    source: 'central',
    target: 'device-3',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e4',
    source: 'central',
    target: 'device-4',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e5',
    source: 'central',
    target: 'device-5',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e6',
    source: 'central',
    target: 'device-6',
    animated: true,
    style: edgeStyles,
  },
  {
    id: 'e7',
    source: 'central',
    target: 'device-7',
    animated: true,
    style: edgeStyles,
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