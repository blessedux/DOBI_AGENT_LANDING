import React from "react";
import { Handle, Position } from "@xyflow/react";

const CentralNode = ({ data }) => {
  return (
    <div className="central-node flex flex-col items-center justify-center">
      <img src="/icons/dobi-icon.png" alt="DOBI" className="w-24 h-24" />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default CentralNode;