"use client";

import React from "react";
import { Handle, Position } from "reactflow";
import Image from "next/image";

interface CentralNodeProps {
  data: {
    label: string;
  };
}

const CentralNode: React.FC<CentralNodeProps> = ({ data }) => {
  return (
    <div className="flex flex-col items-center justify-center w-[150px] h-[150px] rounded-full bg-[#2D4EC8] border-4 border-[#B5C8F9] relative">
      {/* Centered Image */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden">
        <Image
          src="/icons/dobi-icon.png"
          alt="DOBI Icon"
          fill
          className="object-cover rounded-full"
        />
      </div>
      {/* Title Beneath Image */}
      <div className="text-white text-lg font-semibold mt-2">{data.label}</div>
      
      {/* Connection Handles */}
      <Handle type="source" position={Position.Left} className="z-20" />
      <Handle type="source" position={Position.Right} className="z-20" />
      <Handle type="source" position={Position.Top} className="z-20" />
      <Handle type="source" position={Position.Bottom} className="z-20" />
    </div>
  );
};

export default CentralNode;