"use client";

   import React from "react";
   import { Handle, Position } from "reactflow";

   interface CentralNodeProps {
     data: {
       label: string;
     };
   }

   const CentralNode: React.FC<CentralNodeProps> = ({ data }) => {
     return (
       <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
         <div className="font-bold">{data.label}</div>
         <Handle type="target" position={Position.Top} />
         <Handle type="source" position={Position.Bottom} />
       </div>
     );
   };

   export default CentralNode;