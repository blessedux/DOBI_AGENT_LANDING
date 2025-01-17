"use client"

import { Badge } from "../components/ui/badge"
import { ScrollArea } from "./components/ui/scroll-area"

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
]

export function AgentSidebar() {
  return (
    <div className="w-80 border-l p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold">Active Agents</h2>
        <Badge variant="outline">{agents.length}</Badge>
      </div>
      <ScrollArea className="h-[calc(100vh-10rem)]">
        <div className="space-y-4">
          {agents.map((agent) => (
            <div
              key={agent.id}
              className="p-4 rounded-lg border bg-card text-card-foreground"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">{agent.name}</h3>
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
  )
}

