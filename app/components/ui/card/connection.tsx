import React from "react"

interface ConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export function Connection({ from, to }: ConnectionProps) {
  return (
    <svg className="absolute w-full h-full pointer-events-none">
      <line
        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
        stroke="#4A60DD" strokeWidth="2" strokeDasharray="4"
      />
    </svg>
  )
}