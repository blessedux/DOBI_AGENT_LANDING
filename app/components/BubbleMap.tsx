"use client";

import React, { useState } from 'react';
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
import { IMAGES } from '../config/images';

interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: string;
  isOverlayVisible: boolean;
  selectedView: string | null;
  onHoverDevice: (deviceId: string | null) => void;
}

const CustomNode = ({ data }: { data: any }) => {
  const handleMouseEnter = () => {
    if (data.onHover) {
      data.onHover(data.id);
    }
  };

  const handleMouseLeave = () => {
    if (data.onHover) {
      data.onHover(null);
    }
  };

  // Determine if this is a zapIcon2 node based on data index
  const isZapIcon2 = data.index >= 4;
  const imageConfig = IMAGES[isZapIcon2 ? 'zapIcon2' : 'zapIcon'];

  return (
    <div
      className={`rounded-full flex items-center justify-center ${
        isZapIcon2 ? 'w-12 h-12' : 'w-24 h-24'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{ visibility: 'hidden', top: '50%', transform: 'translateY(-50%)' }}
      />
      <Image
        {...imageConfig}
        width={isZapIcon2 ? 40 : 80}
        height={isZapIcon2 ? 40 : 80}
        className="rounded-full"
        priority={true}
        onError={(e) => {
          console.error(`Failed to load image: ${imageConfig.src}`);
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ visibility: 'hidden', bottom: '50%', transform: 'translateY(50%)' }}
      />
    </div>
  );
};

const BubbleLayoutNode = () => (
  <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center">
    <Handle
      type="source"
      position={Position.Top}
      style={{ visibility: 'hidden', top: '50%', transform: 'translateY(-50%)' }}
    />
    <img src="/icons/dobi-icon.png" alt="Dobi" className="w-28 h-28 rounded-full" />
    <Handle
      type="target"
      position={Position.Bottom}
      style={{ visibility: 'hidden', bottom: '50%', transform: 'translateY(50%)' }}
    />
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
        src="/icons/zap_icon1.svg"
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
    data: {
      label: 'Device 1',
      imageSrc: '/icons/zap-icon1.svg',
      index: 0,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-2',
    type: 'customNode',
    position: { x: 600, y: 300 },
    data: {
      label: 'Device 2',
      imageSrc: '/icons/zap_icon2.svg',
      index: 1,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-3',
    type: 'customNode',
    position: { x: 600, y: 400 },
    data: {
      label: 'Device 3',
      imageSrc: '/icons/zap_icon2.svg',
      index: 2,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-4',
    type: 'customNode',
    position: { x: 200, y: 200 },
    data: {
      label: 'Device 4',
      imageSrc: '/icons/zap_icon.svg',
      index: 3,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-5',
    type: 'customNode',
    position: { x: 200, y: 300 },
    data: {
      label: 'Device 5',
      imageSrc: '/icons/zap_icon.svg',
      index: 4,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-6',
    type: 'customNode',
    position: { x: 200, y: 400 },
    data: {
      label: 'Device 6',
      imageSrc: '/icons/zap_icon.svg',
      index: 5,
      onHover: (id: string | null) => onHoverDevice(id),
    },
    draggable: true,
  },
  {
    id: 'device-7',
    type: 'customNode',
    position: { x: 200, y: 500 },
    data: {
      label: 'Device 7',
      imageSrc: '/icons/zap_icon.svg',
      index: 6,
      onHover: (id: string | null) => onHoverDevice(id),
    },
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
  onHoverDevice,
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
            nodes={nodes.map(node => ({
              ...node,
              data: { 
                ...node.data, 
                onHover: onHoverDevice,
                id: node.data.id || node.id
              }
            }))}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodeDrag={onNodeDrag}
            fitView
            panOnScroll
            panOnDrag
            zoomOnScroll={false}
            nodesDraggable={true}
            preventScrolling={false}
            minZoom={0.3}
            maxZoom={1.5}
            defaultZoom={0.6}
            fitViewOptions={{ 
              padding: 0.5,
              minZoom: 0.4,
              maxZoom: 0.7
            }}
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