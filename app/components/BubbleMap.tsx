"use client";

import React from 'react';
import { motion } from 'framer-motion';
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';

interface BubbleMapProps {
  selectedChargerId?: string;
  activeTab: string;
  isOverlayVisible: boolean;
  selectedView: string | null;
}

// Custom Node Component for the entire bubble layout
const BubbleLayoutNode = () => {
  return (
    <div className="relative w-[800px] h-[800px]">
      {/* Center Icon */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white rounded-full flex items-center justify-center z-10">
        <img src="/icons/dobi-icon.png" alt="Dobi" className="w-16 h-16" />
      </div>

      {/* Green Circles - Top */}
      <motion.div
        className="absolute w-16 h-16 bg-green-400/50 rounded-full"
        style={{ top: '15%', left: '45%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-12 h-12 bg-green-400/50 rounded-full"
        style={{ top: '20%', transform: 'translateX(30px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Green Circles - Bottom */}
      <motion.div
        className="absolute w-16 h-16 bg-green-400/50 rounded-full"
        style={{ bottom: '15%', transform: 'translateX(-20px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-12 h-12 bg-green-400/50 rounded-full"
        style={{ bottom: '20%', transform: 'translateX(30px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Green Circles - Left */}
      <motion.div
        className="absolute w-16 h-16 bg-green-400/50 rounded-full"
        style={{ left: '15%', transform: 'translateY(-20px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-12 h-12 bg-green-400/50 rounded-full"
        style={{ left: '20%', transform: 'translateY(30px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Green Circles - Right */}
      <motion.div
        className="absolute w-16 h-16 bg-green-400/50 rounded-full"
        style={{ right: '15%', transform: 'translateY(-20px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-12 h-12 bg-green-400/50 rounded-full"
        style={{ right: '20%', transform: 'translateY(30px)' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Purple Circles - Diagonals */}
      {/* Top Left */}
      <motion.div
        className="absolute w-20 h-20 bg-purple-400/50 rounded-full"
        style={{ top: '20%', left: '20%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-purple-400/50 rounded-full"
        style={{ top: '25%', left: '25%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Top Right */}
      <motion.div
        className="absolute w-20 h-20 bg-purple-400/50 rounded-full"
        style={{ top: '20%', right: '20%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-purple-400/50 rounded-full"
        style={{ top: '25%', right: '25%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Bottom Left */}
      <motion.div
        className="absolute w-20 h-20 bg-purple-400/50 rounded-full"
        style={{ bottom: '20%', left: '20%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-purple-400/50 rounded-full"
        style={{ bottom: '25%', left: '25%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />

      {/* Bottom Right */}
      <motion.div
        className="absolute w-20 h-20 bg-purple-400/50 rounded-full"
        style={{ bottom: '20%', right: '20%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute w-16 h-16 bg-purple-400/50 rounded-full"
        style={{ bottom: '25%', right: '25%' }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
      />
    </div>
  );
};

const nodeTypes = {
  bubbleLayout: BubbleLayoutNode,
};

const BubbleMap: React.FC<BubbleMapProps> = ({
  selectedChargerId,
  activeTab,
  isOverlayVisible,
  selectedView,
}) => {
  const initialNodes: Node[] = [
    {
      id: 'bubble-layout',
      type: 'bubbleLayout',
      position: { x: 0, y: 0 },
      data: {},
      draggable: false,
    },
  ];

  return (
    <div className="w-full h-full">
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          nodeTypes={nodeTypes}
          fitView
          panOnScroll
          panOnDrag
          zoomOnScroll={false}
          nodesDraggable={false}
          preventScrolling={false}
          minZoom={0.5}
          maxZoom={1.5}
          className="w-full h-full"
        >
          <Background color="#aaa" gap={16} />
          <Controls showInteractive={false} />
        </ReactFlow>
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