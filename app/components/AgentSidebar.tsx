"use client";

import { useState } from "react";
import { Badge } from "./ui/Badge";
import { ScrollArea } from "./ui/ScrollArea";
import BubbleMap from "./BubbleMap";
import { ChevronRight, ChevronLeft } from "lucide-react"; 

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

export default function AgentSidebar({ setSelectedDevice, selectedDevice }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

  return (
    <>
      <div 
        className={`fixed right-0 top-0 h-full bg-white shadow-lg z-[60] transition-all duration-300 border-l
          ${isSidebarOpen ? "w-80" : "w-16"}`}
      >
        <div className="flex items-center justify-between p-4">
          {/* Toggle Button (kept visible) */}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
            className="p-2 rounded-md hover:bg-gray-200 transition-all"
          >
            {isSidebarOpen ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>

          {/* Sidebar Title (hide if collapsed) */}
          {isSidebarOpen && (
            <h2 className="font-semibold text-xl text-[#2D4EC8]">Active Devices</h2>
          )}

          {/* Badge Count */}
          {isSidebarOpen && <Badge variant="outline">{chargers.length}</Badge>}
        </div>

        {/* Scroll Area - Hidden when collapsed */}
        {isSidebarOpen && (
          <ScrollArea className="h-[calc(100vh-10rem)]">
            <div className="space-y-4">
              {chargers.map((charger) => (
                <div
                  key={charger.id_charger}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    selectedDevice?.id_charger === charger.id_charger
                      ? "bg-[#B5C8F9]"
                      : "bg-card hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedDevice(charger)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-[#2D4EC8]">{charger.name}</h3>
                    <Badge variant={charger.status === "active" ? "default" : "destructive"}>
                      {charger.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Model: {charger.model}</p>
                  <p className="text-xs text-muted-foreground">Location: {charger.location.address}</p>
                  <p className="text-xs text-muted-foreground">Transactions: {charger.transactions}</p>
                  <p className="text-xs text-muted-foreground">Balance: ${charger.balance_total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </>
  );
}