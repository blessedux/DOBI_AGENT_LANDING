"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="w-full bg-white shadow-md text-gray-900 p-4 flex items-center justify-between">
      {/* Left Section - Logo */}
      <div className="flex items-center space-x-3 flex-shrink-0">
        <Link href="https://www.dobprotocol.com/en/" target="_blank" 
          rel="noopener noreferrer" className="cursor-pointer">
          <Image src="/dobprotocol-logo.svg" alt="DOB Protocol" width={40} height={40} />
        </Link>
        <span className="text-lg font-semibold">Dobi Agent</span>
      </div>

      {/* Centered Section - Tabs & Navigation Links */}
      <div className="flex items-center space-x-8 absolute left-1/2 transform -translate-x-1/2">
        {/* Workflow Tabs */}
        <div className="flex space-x-4">
          {["architecture", "devices"].map((key) => (
            <button
              key={key}
              className={`px-4 py-2 rounded-md transition-all ${
                activeTab === key ? "bg-blue-600 text-white" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => setActiveTab(key)} // ✅ Set activeTab state
            >
              {key === "architecture" ? "Architecture" : "Devices"}
            </button>
          ))}
        </div>

        {/* Right-Side Navigation Links */}
        <div className="flex space-x-6 items-center">
          <Link href="/what-is-dobi" className="hover:text-blue-600 transition-all text-lg">
            What is Dobi?
          </Link>
          <Link href="https://dobprotocol.notion.site/wiki1?v=17beffc346f1816da29e000ccdf6d89f" target="_blank" 
            rel="noopener noreferrer" className="hover:text-blue-600 transition-all text-lg">
            Whitepaper
          </Link>
          <Link href="/app" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all text-lg">
            App
          </Link>
        </div>
      </div>
    </nav>
  );
}