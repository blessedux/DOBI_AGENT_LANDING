"use client";

import React from "react";

export default function Navbar({ selectedWorkflow, setSelectedWorkflow }) {
  return (
    <nav className="w-full bg-white-800 text-white p-4 flex justify-center space-x-4">
      {["architecture", "devices", "details"].map((key) => (
        <button
          key={key}
          className={`px-4 py-2 rounded ${selectedWorkflow === key ? "bg-blue-600" : "bg-gray-500"}`}
          onClick={() => setSelectedWorkflow(key)}
        >
          {key === "architecture" ? "Architecture" : key === "devices" ? "Devices" : "Details"}
        </button>
      ))}
    </nav>
  );
}