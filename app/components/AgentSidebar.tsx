"use client";

import { useState } from "react";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import BubbleMap from "./BubbleMap";

// List of agents
const agents = [
  {
    id: 1,
    name: "Agent Alpha",
    status: "Active",
    type: "Network Monitor",
    lastSeen: "2 mins ago"
  },
  {
    id: 2,
    name: "Agent Beta",
    status: "Idle",
    type: "Data Processor",
    lastSeen: "5 mins ago"
  },
  {
    id: 3,
    name: "Agent Gamma",
    status: "Active",
    type: "Transaction Handler",
    lastSeen: "1 min ago"
  },
  {
    id: 4,
    name: "Agent Delta",
    status: "Offline",
    type: "Security Monitor",
    lastSeen: "1 hour ago"
  }
];

export default function AgentSidebar() {
  const [selectedAgent, setSelectedAgent] = useState(null); // Track selected agent

  return (
    <>
      {/* Sidebar Component */}
<div className="w-80 border-l p-4 fixed right-0 top-0 h-full bg-white shadow-lg z-[60]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-xl text-[#2D4EC8]">Active Agents</h2>
          <Badge variant="outline">{agents.length}</Badge>
        </div>

        {/* Scrollable Agent List */}
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-4">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all 
                ${selectedAgent?.id === agent.id ? "bg-[#B5C8F9]" : "bg-card hover:bg-gray-100"}`}
                onClick={() => setSelectedAgent(agent)} // Clicking an agent opens BubbleMap
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-[#2D4EC8]">{agent.name}</h3>
                  <Badge
                    variant={
                      agent.status === "Active"
                        ? "default"
                        : agent.status === "Idle"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {agent.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{agent.type}</p>
                <p className="text-xs text-muted-foreground">Last seen: {agent.lastSeen}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Bubble Map - Shows when clicking an agent */}
      <BubbleMap 
        isVisible={!!selectedAgent} 
        onClose={() => setSelectedAgent(null)} 
      />
    </>
  );
}