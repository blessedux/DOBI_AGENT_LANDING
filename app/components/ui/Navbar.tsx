"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeTab: "architecture" | "devices";
  setActiveTab: (tab: "architecture" | "devices") => void;
  isSidebarOpen?: boolean;
}

export default function Navbar({ activeTab, setActiveTab, isSidebarOpen = true }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-gray-100 z-[60]">
      <nav className={`
        w-full bg-white shadow-sm text-gray-900 px-6 py-4
        flex items-center justify-between
        transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'pr-[80px]' : 'pr-6'}
      `}>
        {/* Logo section - always visible */}
        <div className="flex items-center space-x-3">
          <Link href="https://dobprotocol.com" className="flex items-center space-x-2">
            <Image src="/icons/dobprotocol-logo.svg" alt="DOB Protocol" width={32} height={32} />
            <span className="text-[#6B7280] font-medium">dob protocol</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
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

        {/* Desktop Right Section */}
        <div className="hidden md:flex items-center space-x-6">
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu Overlay with Blur */}
        <div 
          className={`
            fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden
            flex items-center justify-center
            transition-all duration-300
            ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `} 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Mobile Menu Modal */}
          <div 
            className={`
              bg-white w-[90%] max-w-[400px] mt-[500px] rounded-2xl
              transform transition-all duration-300
              ${isMobileMenuOpen 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-95 pointer-events-none'
              }
            `}
            onClick={e => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Modal Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 space-y-4">
              <button 
                onClick={() => {
                  setActiveTab("architecture");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "architecture" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Architecture
              </button>
              
              <button 
                onClick={() => {
                  setActiveTab("devices");
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full px-4 py-3 rounded-lg text-left ${
                  activeTab === "devices" 
                    ? "bg-blue-50 text-blue-600" 
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Devices
              </button>

              <Link 
                href="https://app.virtuals.io/virtuals/13315"
                className="block w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy DOBI
              </Link>

              <Link 
                href="https://stake.dobprotocol.io"
                className="block w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stake DOBI
              </Link>

              <div className="border-t my-2" />

              <Link 
                href="https://dobprotocol.notion.site/wiki1"
                className="block w-full px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiki
              </Link>

              <Link 
                href="https://home.dobprotocol.com/home"
                className="block w-full px-4 py-3 bg-[#4F46E5] text-white rounded-lg hover:bg-[#4338CA] text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                APP
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}