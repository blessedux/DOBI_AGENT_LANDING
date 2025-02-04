"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"
import Image from "next/image"

interface Milestone {
  id: number
  title: string
  description: string
  progress: number // percentage along the path (0-100)
}

interface MilestoneIcon {
  id: number;
  icon: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description: "Dolor sit amet, consectetur adipiscing elit.",
    progress: 2 // Start from left
  },
  {
    id: 2,
    title: "Consectetur Adipiscing",
    description: "Nullam non felis in augue euismod faucibus.",
    progress: 15
  },
  {
    id: 3,
    title: "Nullam Felis",
    description: "Sed do eiusmod tempor incididunt ut labore.",
    progress: 25
  },
  {
    id: 4,
    title: "Tempor Incididunt",
    description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    progress: 35
  },
  {
    id: 5,
    title: "Minim Veniam",
    description: "Duis aute irure dolor in reprehenderit in voluptate.",
    progress: 48
  },
  {
    id: 6,
    title: "Duis Aute",
    description: "Excepteur sint occaecat cupidatat non proident.",
    progress: 60
  },
  {
    id: 7,
    title: "Sint Occaecat",
    description: "Sunt in culpa qui officia deserunt mollit anim id est.",
    progress: 72
  },
  {
    id: 8,
    title: "Culpa Officia",
    description: "Sed ut perspiciatis unde omnis iste natus error.",
    progress: 82
  },
  {
    id: 9,
    title: "Perspiciatis Unde",
    description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur.",
    progress: 92
  },
  {
    id: 10,
    title: "Nemo Enim",
    description: "At vero eos et accusamus et iusto odio dignissimos.",
    progress: 98 // End near right
  },
]

const milestoneIcons: MilestoneIcon[] = [
  { id: 1, icon: "/icons/Step1.svg" },
  { id: 2, icon: "/icons/Step2.svg" },
  { id: 3, icon: "/icons/Step3.svg" },
  { id: 4, icon: "/icons/Step4.svg" },
  { id: 5, icon: "/icons/Step5.svg" },
  { id: 6, icon: "/icons/Step6.svg" },
  { id: 7, icon: "/icons/Step7.svg" },
  { id: 8, icon: "/icons/Step8.svg" },
  { id: 9, icon: "/icons/Step9.svg" },
  { id: 10, icon: "/icons/Step10.svg" },
];

export default function MilestoneRoadmap() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Add cursor position tracking for path elasticity
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Calculate viewport width for dynamic scaling
  const [viewportWidth, setViewportWidth] = useState(0)

  // Add drag position state
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

  // Add state for pulsing animation
  const [pulsingMilestone, setPulsingMilestone] = useState(1)

  // Calculate minimum scale based on viewport width
  const minScale = Math.min(1, viewportWidth / 2939)

  // Enhanced point calculation with path verification
  const getPointAtProgress = (progress: number) => {
    if (typeof document === 'undefined') return { x: 0, y: 0 }
    
    const path = document.querySelector('.milestone-path') as SVGPathElement
    if (!path) return { x: 0, y: 0 }

    const length = path.getTotalLength()
    const point = path.getPointAtLength(length * (progress / 100))
    
    // Verify point is on path
    const pathPoint = path.getPointAtLength(path.getTotalLength() * (progress / 100))
    const distanceToPath = Math.sqrt(
      Math.pow(point.x - pathPoint.x, 2) + Math.pow(point.y - pathPoint.y, 2)
    )

    // If point is too far from path, adjust it
    if (distanceToPath > 1) {
      point.x = pathPoint.x
      point.y = pathPoint.y
    }

    // Calculate vertical offset based on SVG viewBox height
    const svgHeight = 545 // Height from viewBox
    const containerHeight = 800 // Height of container
    const verticalCenter = containerHeight / 2
    const yOffset = (verticalCenter - svgHeight / 2)

    return { 
      x: point.x,
      y: point.y + yOffset + 200 // Add offset to align with path
    }
  }

  // Handle mouse wheel zoom with reduced sensitivity
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    // Only allow zooming in (negative deltaY means zoom in)
    if (e.deltaY < 0) {
      const delta = e.deltaY * -0.005
      const newScale = Math.min(Math.max(scale + delta, 1), 2) // Minimum scale is now 1
      setScale(newScale)
    }
  }

  // Handle drag scrolling
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Calculate elastic path modification with centered scaling
  const getElasticPath = () => {
    const basePathD = "M2944.5 2L1914.34 2H1813.43C1788.09 1.99988 1752.88 6.09955 1739.49 20.8113C1729.98 31.2462 1718.58 52.2039 1751.04 79.3352C1783.5 106.466 1920.5 163.986 1935.13 221.464C1943.46 254.174 1931.11 290.933 1881.22 302.979C1790.32 324.926 1628.03 232.207 1515.34 194.293C1475.03 174.7 1425.87 175.481 1410.58 205.525C1398.22 229.825 1394.41 242.366 1424.45 278.943C1467.24 331.051 1540.33 377.739 1560.01 427.342C1570.8 454.514 1551.82 506.795 1513.03 525.579C1474.23 544.362 1376.41 563.449 1283.78 493.533C1191.14 423.618 28.9201 269.131 2 266"
    
    const scaleFactor = viewportWidth / 2939 // Update to match new SVG width

    // Transform path coordinates with centered scaling
    const stretchedPath = basePathD.replace(/(-?\d+\.?\d*)/g, (match, p1) => {
      const num = parseFloat(p1)
      if (num === 2) return '2' // Keep vertical positions unchanged
      
      // Special handling for endpoints
      if (num <= 2) return '0' // Left endpoint
      if (num >= 2944.5) return viewportWidth.toString() // Right endpoint
      
      // Scale intermediate points from the center
      const normalizedPosition = (num - 2) / (2944.5 - 2)
      const scaledPosition = normalizedPosition * viewportWidth
      return scaledPosition.toString()
    })
    
    return stretchedPath
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [scale])

  // Add effect for sequential pulsing
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsingMilestone(current => current === 10 ? 1 : current + 1)
    }, 2000) // Change milestone every 2 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseDown={handleDragStart}
      onMouseUp={() => setIsDragging(false)}
      onMouseMove={handleDrag}
      onMouseLeave={() => setIsDragging(false)}
    >
      <motion.div 
        className="relative w-screen h-[800px] px-8"
        style={{
          transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
          transformOrigin: 'center center',
          transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          minWidth: '100vw',
          margin: '40px 0'
        }}
      >
        {/* Base Vector Path */}
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${viewportWidth} 545`}
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-[200px] left-0"
          style={{
            overflow: 'visible'
          }}
        >
          <motion.path
            className="milestone-path stroke-[#C8D3F1] stroke-[4] fill-none"
            strokeLinecap="round"
            d={getElasticPath()}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut"
            }}
          />
        </svg>

        {/* Milestone Markers */}
        {milestones.map((milestone) => {
          const point = getPointAtProgress(milestone.progress)
          
          return (
            <div
              key={milestone.id}
              className="absolute"
              style={{
                left: point.x,
                top: point.y,
                transform: "translate(-50%, -50%)",
                zIndex: 10
              }}
            >
              <motion.div
                className="relative"
                onHoverStart={() => setActiveMilestone(milestone.id)}
                onHoverEnd={() => setActiveMilestone(null)}
              >
                {/* Base Circle with Pulsing Animation */}
                <motion.div
                  className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg cursor-pointer overflow-hidden relative"
                  animate={pulsingMilestone === milestone.id ? {
                    boxShadow: [
                      "0 0 0 0 rgba(59, 130, 246, 0.4)",
                      "0 0 0 10px rgba(59, 130, 246, 0)",
                    ]
                  } : {}}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    times: [0, 1],
                    repeat: pulsingMilestone === milestone.id ? 1 : 0
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={activeMilestone === milestone.id 
                      ? { opacity: 1, rotate: 0 } 
                      : { opacity: 0, rotate: -45 }
                    }
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src="/icons/ep_success.svg"
                      alt="success"
                      width={16}
                      height={16}
                      className="text-white"
                    />
                  </motion.div>
                </motion.div>

                {/* Top Circle with Milestone-specific Icon */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={activeMilestone === milestone.id 
                    ? { scale: 1, opacity: 1 } 
                    : { scale: 0, opacity: 0 }
                  }
                  transition={{ 
                    duration: 0.3, 
                    ease: "easeOut",
                    delay: activeMilestone === milestone.id ? 0.15 : 0 
                  }}
                  className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-30"
                  style={{ 
                    top: '-96px', // Align with bottom icon
                    transformOrigin: 'center center',
                    pointerEvents: 'none'
                  }}
                >
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center overflow-hidden">
                    <Image
                      src={`/icons/Step${milestone.id}.svg`}
                      alt={`Step ${milestone.id}`}
                      width={96}
                      height={96}
                      className="w-full h-full"
                      style={{
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                </motion.div>

                {/* Milestone Content - Horizontal Animation */}
                {activeMilestone === milestone.id && (
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      x: -24, // Start behind the icon
                      scale: 0.9 
                    }}
                    animate={{ 
                      opacity: 1, 
                      x: 120, // Move to the right of the icon
                      scale: 1 
                    }}
                    transition={{ 
                      duration: 0.3, 
                      ease: "easeOut",
                      delay: 0.2 // Start after icon appears
                    }}
                    className="absolute z-20 bg-white rounded-lg shadow-lg p-4"
                    style={{
                      top: '-96px', // Align with top icon
                      left: '50%',
                      width: '240px',
                      height: '96px', // Match icon height
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center'
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-blue-600/60 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        Step {milestone.id} of 10
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm mb-0.5 line-clamp-1">{milestone.title}</h3>
                    <p className="text-xs text-gray-600 line-clamp-2">{milestone.description}</p>
                  </motion.div>
                )}

                {/* Vertical Line - Updated position */}
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={activeMilestone === milestone.id 
                    ? { height: 64, opacity: 1 } 
                    : { height: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-blue-400"
                  style={{ 
                    top: '-64px',
                    transformOrigin: 'top',
                    zIndex: 25
                  }}
                />
              </motion.div>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}

