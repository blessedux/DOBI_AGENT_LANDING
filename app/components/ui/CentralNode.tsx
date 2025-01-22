import React from "react";
import Image from "next/image";
import { Handle, Position } from "reactflow";

const CentralNode = ({ data }: { data: any }) => {
  return (
    <div
      className="w-32 h-32 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-500 shadow-lg border-4 border-white relative"
    >
      {/* DOBI Icon in the center */}
      <Image 
        src="/icons/dobi-icon.png" 
        alt="DOBI Agent" 
        width={64} 
        height={64} 
        className="rounded-full"
      />

      {/* Handles for connecting edges */}
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-white" />
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-white" />
    </div>
  );
};

export default CentralNode;