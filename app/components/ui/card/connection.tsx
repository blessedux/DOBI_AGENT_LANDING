import React from "react"

interface ConnectionProps {
  from: { x: number; y: number }
  to: { x: number; y: number }
  label?: string
  number?: string
}

export function Connection({ from, to, label, number }: ConnectionProps) {
  return (
    <div className="absolute w-full h-full pointer-events-none">
      {/* Number Circle */}
      {number && (
        <div
          className="absolute w-10 h-10 bg-[#A2A2FF] text-white text-sm font-bold flex items-center justify-center rounded-full shadow-lg"
          style={{
            left: `${(from.x + to.x) / 2 - 15}px`,
            top: `${(from.y + to.y) / 2 - 15}px`,
          }}
        >
          {number}
        </div>
      )}

      {/* SVG Connection Line */}
      <svg className="absolute w-full h-full">
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
          strokeDasharray="4 4"
          markerEnd="url(#arrowhead)"
        />
      </svg>

      {/* Text Label */}
      {label && (
        <div
          className="absolute text-gray-700 text-sm font-semibold"
          style={{
            left: `${(from.x + to.x) / 2 - 40}px`,
            top: `${(from.y + to.y) / 2 - 25}px`,
          }}
        >
          {label}
        </div>
      )}
    </div>
  )
}