"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

interface Milestone {
  id: number
  title: string
  description: string
  progress: number // percentage along the path (0-100)
}

const milestones: Milestone[] = [
  {
    id: 1,
    title: "Lorem Ipsum",
    description: "Dolor sit amet, consectetur adipiscing elit.",
    progress: 0 // start of path
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
    progress: 30
  },
  {
    id: 4,
    title: "Tempor Incididunt",
    description: "Ut enim ad minim veniam, quis nostrud exercitation.",
    progress: 45
  },
  {
    id: 5,
    title: "Minim Veniam",
    description: "Duis aute irure dolor in reprehenderit in voluptate.",
    progress: 55
  },
  {
    id: 6,
    title: "Duis Aute",
    description: "Excepteur sint occaecat cupidatat non proident.",
    progress: 65
  },
  {
    id: 7,
    title: "Sint Occaecat",
    description: "Sunt in culpa qui officia deserunt mollit anim id est.",
    progress: 75
  },
  {
    id: 8,
    title: "Culpa Officia",
    description: "Sed ut perspiciatis unde omnis iste natus error.",
    progress: 85
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
    progress: 100 // end of path
  },
]

export default function MilestoneRoadmap() {
  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  // Add cursor position tracking for path elasticity
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  // Function to get point coordinates along the path
  const getPointAtProgress = (progress: number) => {
    if (typeof document === 'undefined') return { x: 0, y: 0 }
    
    const path = document.querySelector('.milestone-path') as SVGPathElement
    if (!path) return { x: 0, y: 0 }

    const length = path.getTotalLength()
    const point = path.getPointAtLength(length * (progress / 100))
    
    return { x: point.x, y: point.y }
  }

  // Handle mouse wheel zoom with reduced sensitivity
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault()
    const delta = e.deltaY * -0.005 // Reduced from -0.01 to -0.005 for less sensitivity
    const newScale = Math.min(Math.max(scale + delta, 0.5), 2)
    setScale(newScale)
  }

  // Handle drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - containerRef.current!.offsetLeft)
    setScrollLeft(containerRef.current!.scrollLeft)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMoveEffect = (e: React.MouseEvent) => {
    if (isDragging) {
      // Handle dragging logic
      const x = e.pageX - containerRef.current!.offsetLeft
      const walk = (x - startX) * 1.5 // Reduced from 2 to 1.5 for smoother scrolling
      containerRef.current!.scrollLeft = scrollLeft - walk
    }
    
    // Update mouse position for path elasticity
    const rect = containerRef.current?.getBoundingClientRect()
    if (rect) {
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      setMousePosition({ x, y })
    }
  }

  // Calculate elastic path modification based on mouse position
  const getElasticPath = () => {
    const basePathD = "M1275 2L1164.62 2H1029.48C995.545 1.99984 948.385 7.49385 930.444 27.2093C917.719 41.1931 902.442 69.2788 945.918 105.638C989.395 141.997 1172.87 219.079 1192.47 296.106C1203.63 339.942 1187.08 389.202 1120.26 405.346C998.53 434.756 781.178 310.503 630.247 259.693C576.263 233.437 510.424 234.484 489.949 274.746C473.388 307.311 468.285 324.116 508.518 373.134C565.833 442.965 663.715 505.533 690.08 572.006C704.523 608.419 679.112 678.482 627.152 703.653C575.193 728.825 444.187 754.403 320.12 660.709C196.053 567.015 38.0536 488.704 2 484.509"
    
    // Add subtle elastic effect based on mouse position
    const elasticFactor = 20 * (1 - mousePosition.x) // More effect when mouse is to the left
    const stretchedPath = basePathD.replace(/(\d+\.?\d*)/g, (match) => {
      const num = parseFloat(match)
      if (num > 1000) { // Only affect right side points
        return (num + elasticFactor).toString()
      }
      return match
    })
    
    return stretchedPath
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [scale])

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-x-auto overflow-y-hidden"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMoveEffect}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="relative min-w-[1277px] h-[729px] w-full"
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'left center',
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Base Vector Path */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1277 729"
          fill="none"
          preserveAspectRatio="xMidYMid meet"
          className="absolute top-0 left-0"
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
              }}
            >
              {/* Milestone Dot with Animated Check Icon */}
              <motion.div
                className="relative"
                onHoverStart={() => setActiveMilestone(milestone.id)}
                onHoverEnd={() => setActiveMilestone(null)}
              >
                <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-lg cursor-pointer overflow-hidden">
                  <motion.div
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={activeMilestone === milestone.id ? { opacity: 1, rotate: 0 } : { opacity: 0, rotate: -45 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full h-full flex items-center justify-center bg-primary"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                </div>

                {/* Milestone Content */}
                {activeMilestone === milestone.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute z-10 bg-white rounded-lg shadow-lg p-4 min-w-[240px] transform -translate-x-1/2 mt-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs font-medium text-primary-foreground/60 bg-primary/10 px-2 py-1 rounded-full">
                        Step {milestone.id} of 10
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{milestone.title}</h3>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

