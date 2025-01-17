"use client"

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card/card"
import { ChartContainer, ChartTooltip } from "./ui/scroll-area"

const data = [
  { timestamp: "00:00", value: 400 },
  { timestamp: "03:00", value: 300 },
  { timestamp: "06:00", value: 600 },
  { timestamp: "09:00", value: 500 },
  { timestamp: "12:00", value: 700 },
  { timestamp: "15:00", value: 400 },
  { timestamp: "18:00", value: 500 },
  { timestamp: "21:00", value: 600 },
]

export function DobiChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Network Activity</CardTitle>
        <CardDescription>Agent performance over time</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            value: {
              label: "Activity",
              color: "hsl(var(--primary))",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <ChartTooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

