"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card/card"
import { Connection } from "./ui/connection"

const cardsData = [
  { id: 1, title: "EV-Charger", description: "RWA Asset", dataKey: "evCharger", color: "#4A60DD", x: 200, y: 100 },
  { id: 2, title: "DBS Accountability System", description: "Audit Logs", dataKey: "dbs", color: "#6C63FF", x: 500, y: 100 },
  { id: 3, title: "DOBO-CORE", description: "Fuzzy AI Agent", dataKey: "doboCore", color: "#FF6363", x: 500, y: 300 },
  { id: 4, title: "ZKP", description: "Zero Knowledge Proofs", dataKey: "zkp", color: "#FFD166", x: 200, y: 300 },
  { id: 5, title: "Smart Contract", description: "Dobprotocol Pool", dataKey: "smartContract", color: "#06D6A0", x: 200, y: 500 },
  { id: 6, title: "Token Holders", description: "Distribution", dataKey: "tokenHolders", color: "#118AB2", x: 500, y: 500 },
]

const data = [
  { timestamp: "00:00", evCharger: 400, dbs: 300, doboCore: 600, zkp: 500, smartContract: 700, tokenHolders: 400 },
  { timestamp: "03:00", evCharger: 300, dbs: 400, doboCore: 500, zkp: 600, smartContract: 500, tokenHolders: 600 },
  { timestamp: "06:00", evCharger: 600, dbs: 500, doboCore: 400, zkp: 700, smartContract: 600, tokenHolders: 500 },
  { timestamp: "09:00", evCharger: 500, dbs: 600, doboCore: 700, zkp: 400, smartContract: 500, tokenHolders: 700 },
  { timestamp: "12:00", evCharger: 700, dbs: 500, doboCore: 600, zkp: 500, smartContract: 400, tokenHolders: 300 },
  { timestamp: "15:00", evCharger: 400, dbs: 700, doboCore: 500, zkp: 600, smartContract: 700, tokenHolders: 500 },
  { timestamp: "18:00", evCharger: 500, dbs: 600, doboCore: 400, zkp: 700, smartContract: 500, tokenHolders: 400 },
  { timestamp: "21:00", evCharger: 600, dbs: 500, doboCore: 700, zkp: 400, smartContract: 600, tokenHolders: 700 },
]

const connections = [
  { from: 1, to: 2 },
  { from: 2, to: 3 },
  { from: 3, to: 6 },
  { from: 1, to: 4 },
  { from: 4, to: 5 },
  { from: 5, to: 6 },
]

export default function DobiChart() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {/* Render animated connections */}
      {connections.map((conn, index) => {
        const fromCard = cardsData.find((p) => p.id === conn.from)
        const toCard = cardsData.find((p) => p.id === conn.to)

        return fromCard && toCard ? (
          <Connection key={index} from={{ x: fromCard.x + 100, y: fromCard.y + 50 }} to={{ x: toCard.x + 100, y: toCard.y + 50 }} />
        ) : null
      })}

      {/* Render all cards */}
      {cardsData.map((card) => (
        <div key={card.id} style={{ position: "absolute", top: card.y, left: card.x }}>
          <Card>
            <CardHeader>
              <CardTitle>{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey={card.dataKey} stroke={card.color} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  )
}