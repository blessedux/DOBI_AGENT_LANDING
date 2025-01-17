"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card/card"
import { Connection } from "./ui/connection"

const cardSpacingX = 400 // Horizontal spacing
const cardSpacingY = 250 // Vertical spacing

const cardsData = [
  { id: 1, title: "EV-Charger", description: "RWA Asset", x: 100, y: 50 },
  { id: 2, title: "DBS Accountability System", description: "Audit Logs", x: 100 + cardSpacingX, y: 50 },
  { id: 3, title: "ZKP", description: "Zero Knowledge Proofs", x: 100, y: 50 + cardSpacingY },
  { id: 4, title: "DOBO-CORE", description: "Fuzzy AI Agent", x: 100 + cardSpacingX, y: 50 + cardSpacingY },
  { id: 5, title: "Smart Contract", description: "Dobprotocol Pool", x: 100, y: 50 + cardSpacingY * 2 },
  { id: 6, title: "Token Holders", description: "Distribution", x: 100 + cardSpacingX, y: 50 + cardSpacingY * 2 },
]

const connections = [
  { from: 1, to: 2, label: "Rwa Reports", number: "02" }, // EV-Charger → DBS
  { from: 3, to: 4, label: "Deposit of Funds", number: "04" }, // ZKP → DOBO-CORE
  { from: 5, to: 6, label: "Distribution", number: "06" }, // Smart Contract → Token Holders
]

export default function DobiChart() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Render Animated Connections */}
      {connections.map((conn, index) => {
        const fromCard = cardsData.find((p) => p.id === conn.from)
        const toCard = cardsData.find((p) => p.id === conn.to)

        return fromCard && toCard ? (
          <Connection
            key={index}
            from={{ x: fromCard.x + 220, y: fromCard.y + 80 }} 
            to={{ x: toCard.x - 10, y: toCard.y + 80 }}
            label={conn.label}
            number={conn.number}
          />
        ) : null
      })}

      {/* Render All Cards WITHOUT Graphs */}
      {cardsData.map((card, index) => (
        <div key={card.id} style={{ position: "absolute", top: card.y, left: card.x }}>
          {/* Number Bubble */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#A2A2FF] text-white text-sm font-bold flex items-center justify-center rounded-full shadow-lg">
            {`0${index + 1}`}
          </div>

          {/* Card Component (NO GRAPHS) */}
          <Card>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500">Data not available</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}