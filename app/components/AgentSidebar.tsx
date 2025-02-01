"use client";

import React, { useState } from "react";
import { Badge } from "./ui/Badge";
import { ScrollArea } from "./ui/ScrollArea";
import { ChevronRight, ChevronLeft, Zap } from "lucide-react"; 
import DeviceWorkflow from "./DeviceWorkflow";
import { Charger } from "./DobiChart";

const chargers = [
  {
    id_charger: "CHG-001",
    name: "Fast Charger A1",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4489, longitude: -70.6693, address: "Santiago, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2023-12-01",
    status: "active",
    transactions: 1200,
    cost_generated: 5000.75,
    income_generated: 15000.5,
    balance_total: 10000.25,
  },
  {
    id_charger: "CHG-002",
    name: "Eco Charger B3",
    model: "ABB Slow",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4567, longitude: -70.6723, address: "Providencia, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-01-15",
    status: "maintenance",
    transactions: 450,
    cost_generated: 2000.0,
    income_generated: 6500.0,
    balance_total: 4500.0,
  },
  {
    id_charger: "CHG-003",
    name: "Urban Charger C1",
    model: "ABB Slow",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.445, longitude: -70.6601, address: "Las Condes, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-02-01",
    status: "active",
    transactions: 320,
    cost_generated: 1500.0,
    income_generated: 4500.0,
    balance_total: 3000.0,
  },
  {
    id_charger: "CHG-004",
    name: "Eco Charger B4",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4472, longitude: -70.6765, address: "Ñuñoa, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-03-10",
    status: "active",
    transactions: 700,
    cost_generated: 3000.0,
    income_generated: 10000.0,
    balance_total: 7000.0,
  },
  {
    id_charger: "CHG-005",
    name: "Highway Charger D1",
    model: "ABB Fast",
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABJ4AAAUQCAYAAAAF3pr2AAAA...",
    location: { latitude: -33.4432, longitude: -70.6612, address: "Vitacura, Chile" },
    company_owner: "Ehive SPA",
    creation_date: "2024-04-05",
    status: "active",
    transactions: 950,
    cost_generated: 4000.0,
    income_generated: 14000.0,
    balance_total: 10000.0,
  },
  {
    id_charger: "CHG-006",
    name: "Green Charger G1",
    model: "ABB Slow",
    image: "data:image/png;base64,UklGRjKKAQBXRUJQVlA4IAKuAACQZASdASoABAAEPjEYiEQi...",
    location: { latitude: 37.7749, longitude: -122.4194, address: "San Francisco, CA, USA" },
    company_owner: "GreenTech SPA",
    creation_date: "2024-05-10",
    status: "maintenance",
    transactions: 600,
    cost_generated: 2500.0,
    income_generated: 8500.0,
    balance_total: 6000.0,
  },
  {
    id_charger: "CHG-007",
    name: "Green Charger G2",
    model: "ABB Fast",
    image: "data:image/png;base64,UklGRjKKAQBXRUJQVlA4IAKuAACQZASdASoABAAEPjEYiEQi...",
    location: { latitude: 37.774, longitude: -122.419, address: "Oakland, CA, USA" },
    company_owner: "GreenTech SPA",
    creation_date: "2024-06-20",
    status: "active",
    transactions: 800,
    cost_generated: 3000.0,
    income_generated: 12000.0,
    balance_total: 9000.0,
  },
];

interface AgentSidebarProps {
  setSelectedDevice: (device: Charger | null) => void;
  selectedDevice: Charger | null;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

const AgentSidebar: React.FC<AgentSidebarProps> = ({ 
  setSelectedDevice, 
  selectedDevice,
  isSidebarOpen,
  setIsSidebarOpen
}) => {
  const [isWorkflowOpen, setIsWorkflowOpen] = useState(false);

  const handleDeviceClick = (charger: Charger) => {
    setSelectedDevice(charger);
    setIsWorkflowOpen(true);
  };

  return (
    <>
      <div 
        className={`fixed right-0 top-0 h-full bg-white/80 backdrop-blur-md shadow-lg z-[60] 
          transition-all duration-300 border-l border-gray-200
          ${isSidebarOpen ? "w-80" : "w-16"}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-full hover:bg-gray-100/80 transition-all"
          >
            {isSidebarOpen ? <ChevronRight className="text-gray-600" /> : <ChevronLeft className="text-gray-600" />}
          </button>

          {isSidebarOpen && (
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-xl text-[#2D4EC8]">Devices</h2>
              <Badge variant="outline" className="bg-[#B5C8F9]/20">
                {chargers.length}
              </Badge>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <ScrollArea className="h-[calc(100vh-5rem)] px-4">
            <div className="space-y-3 py-4">
              {chargers.map((charger) => (
                <div
                  key={charger.id_charger}
                  className={`p-4 rounded-xl border cursor-pointer transition-all
                    ${selectedDevice?.id_charger === charger.id_charger
                      ? "bg-[#B5C8F9]/20 border-[#2D4EC8]"
                      : "hover:bg-gray-50 border-gray-100"
                    }`}
                  onClick={() => handleDeviceClick(charger)}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-[#B5C8F9]/20 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#2D4EC8]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#2D4EC8]">{charger.name}</h3>
                      <p className="text-xs text-gray-500">{charger.model}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="text-xs">
                      <p className="text-gray-500">Transactions</p>
                      <p className="font-medium">{charger.transactions}</p>
                    </div>
                    <div className="text-xs">
                      <p className="text-gray-500">Balance</p>
                      <p className="font-medium">${charger.balance_total.toLocaleString()}</p>
                    </div>
                  </div>

                  <Badge 
                    variant={charger.status === "active" ? "default" : "secondary"}
                    className={`mt-3 ${
                      charger.status === "active" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {charger.status}
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>

      <DeviceWorkflow
        isOpen={isWorkflowOpen}
        onClose={() => setIsWorkflowOpen(false)}
        selectedDevice={selectedDevice}
      />
    </>
  );
};

export default AgentSidebar;