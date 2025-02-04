"use client";

import React from "react";
import { Badge } from "./ui/Badge";
import { ScrollArea } from "./ui/ScrollArea";
import { 
  ChevronRight, 
  ChevronLeft, 
  Zap,           // Replace Icon1
  Battery,       // Replace Icon2
  Activity       // Replace Icon3
} from "lucide-react"; 
import { Charger } from "./DobiChart";
import Image from 'next/image';

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
  isSidebarOpen, 
  setIsSidebarOpen,
  selectedDevice,
  setSelectedDevice 
}) => {
  const handleChevronClick = () => {
    if (selectedDevice) {
      setSelectedDevice(null);
    } else {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <div className={`fixed right-0 top-[64px] bottom-0 bg-white/90 backdrop-blur-md shadow-lg z-[60] 
        transition-all duration-300 border-l border-gray-100 flex flex-col
        ${isSidebarOpen ? "w-80" : "w-16"}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <button 
          onClick={handleChevronClick}
          className="p-2 rounded-full hover:bg-gray-100/80 transition-all"
        >
          {isSidebarOpen ? <ChevronRight className="text-gray-600" /> : <ChevronLeft className="text-gray-600" />}
        </button>
      </div>

      {/* Device list */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {chargers.map((charger, index) => (
              <button
                key={charger.id_charger}
                onClick={() => setSelectedDevice(charger)}
                className={`w-full p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer text-left
                  ${selectedDevice?.id_charger === charger.id_charger
                    ? "bg-[#E8EDFF] border-[#2D4EC8]"
                    : "hover:bg-gray-50 border-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#E8EDFF] flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/icons/Zap_Icon.png"
                        alt="Zap Icon"
                        width={48}
                        height={48}
                        className="w-[120%] h-[120%] object-cover"
                        style={{ transform: 'scale(1.2)' }}
                      />
                    </div>
                    <Badge 
                      className={`absolute -top-1 -right-1 px-2 py-0.5 text-[10px] ${
                        charger.status === 'active' 
                          ? 'bg-green-400 text-white'
                          : 'bg-blue-400 text-white'
                      }`}
                    >
                      #{index + 1}
                    </Badge>
                  </div>
                  
                  {isSidebarOpen && (
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{charger.name}</h3>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <span>{charger.model}</span>
                        <span>•</span>
                        <span>{charger.location.address}</span>
                      </div>
                    </div>
                  )}
                </div>

                {isSidebarOpen && (
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <p className="text-xs text-[#2D4EC8] font-medium">Transactions</p>
                      <p className="text-lg font-semibold">{charger.transactions}</p>
                    </div>
                    <div>
                      <p className="text-xs text-[#2D4EC8] font-medium">Balance</p>
                      <p className="text-lg font-semibold">${charger.balance_total.toLocaleString()}</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default AgentSidebar;