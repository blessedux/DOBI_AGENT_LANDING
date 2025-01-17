import React from "react"

interface ConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
}

export function Connection({ from, to }: ConnectionProps) {
  return (
    <svg className="absolute w-full h-full pointer-events-none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#4A60DD" />
        </marker>
      </defs>
      <line
        x1={from.x} y1={from.y} x2={to.x} y2={to.y}
        stroke="#4A60DD" strokeWidth="2"
        strokeDasharray="5,5"
        markerEnd="url(#arrowhead)"
        className="animate-draw-line"
      />
    </svg>
  )
}