"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  activeTab: "architecture" | "devices";
  setActiveTab: (tab: "architecture" | "devices") => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isSidebarOpen = true }: NavbarProps) {
  return (
    <nav className="w-full bg-white shadow-sm text-gray-900 px-6 py-4 flex items-center">
      {/* Left Section - Logo and Brand */}
      <div className="flex items-center space-x-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/icons/dobprotocol-logo.svg" 
            alt="DOB Protocol" 
            width={32} 
            height={32} 
          />
          <span className="text-[#6B7280] font-medium">dob protocol</span>
        </Link>
      </div>

      {/* Center Section - Navigation Items */}
      <div className="flex-1 flex items-center justify-center space-x-8">
        <button 
          onClick={() => setActiveTab("architecture")}
          className={`${
            activeTab === "architecture" 
              ? "text-[#4F46E5] font-medium" 
              : "text-gray-600"
          } hover:text-gray-900 transition-colors`}
        >
          Architecture
        </button>
        
        <button 
          onClick={() => setActiveTab("devices")}
          className={`${
            activeTab === "devices" 
              ? "text-[#4F46E5] font-medium" 
              : "text-gray-600"
          } hover:text-gray-900 transition-colors`}
        >
          Devices
        </button>
        
        <Link 
          href="https://app.virtuals.io/virtuals/13315"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Buy DOBI
        </Link>
        
        <Link 
          href="https://stake.dobprotocol.io"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Stake DOBI
        </Link>
      </div>

      {/* Right Section - Wiki and App */}
      <div className={`
        flex items-center space-x-6
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'mr-[336px]' : 'mr-[80px]'}
      `}>
        <Link 
          href="https://dobprotocol.notion.site/wiki1"
          className="text-gray-600 hover:text-gray-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wiki
        </Link>
        
        <Link 
          href="https://home.dobprotocol.com/home"
          className="bg-[#4F46E5] text-white px-4 py-2 rounded-lg hover:bg-[#4338CA] transition-colors flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          APP
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1"
          >
            <path 
              d="M7 17L17 7M17 7H7M17 7V17" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </nav>
  );
}