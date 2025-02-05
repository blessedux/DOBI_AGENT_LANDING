"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Charger } from "../DobiChart"

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

interface MilestoneRoadmapProps {
  device: Charger;
}

const milestones: Milestone[] = [
  {
    id: 10,
    title: "Variable Costs Management",
    description: "Allocate variable costs",
    progress: 2 // Start from left
  },
  {
    id: 9,
    title: "Fixed Costs Management",
    description: "Allocate fixed cost",
    progress: 15
  },
  {
    id: 8,
    title: "Cost Allocation",
    description: "Allocate fixed and variable costs",
    progress: 25
  },
  {
    id: 7,
    title: "Profit Distribution",
    description: "Distribute profit to token holders",
    progress: 35
  },
  {
    id: 6,
    title: "Dobprotocol Profit Pool - Smart Contract",
    description: "Send funds to profit pool and manage allocations",
    progress: 48
  },
  {
    id: 5,
    title: "ZKP - Zero Knowledge Proof",
    description: "Deposit funds securely",
    progress: 60
  },
  {
    id: 4,
    title: "DOBI-CORE Fuzzy AI Agent",
    description: "Analyze reports and prepare allocations",
    progress: 72
  },
  {
    id: 3,
    title: "Convert to DOB Token",
    description: "Convert fiat to DOB token",
    progress: 82
  },
  {
    id: 2,
    title: "DBS Accountability System",
    description: "Validate RWA reports and process accounting data",
    progress: 92
  },
  {
    id: 1,
    title: "Transaction Received - EV Charger",
    description: "Receive energy transaction and generate RWA reports",
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

const MilestoneRoadmap: React.FC<MilestoneRoadmapProps> = ({ device }) => {
  console.log('MilestoneRoadmap device:', device);

  const [activeMilestone, setActiveMilestone] = useState<number | null>(null)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // Track viewport width for dynamic path scaling
  const [viewportWidth, setViewportWidth] = useState(0)

  // Pulsing animation logic
  const [pulsingMilestone, setPulsingMilestone] = useState(1)
  useEffect(() => {
    const interval = setInterval(() => {
      setPulsingMilestone(current => (current === 10 ? 1 : current + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // Track path animation completion
  const [isPathAnimationComplete, setIsPathAnimationComplete] = useState(false)

  // Update viewport width on resize
  useEffect(() => {
    const updateWidth = () => {
      setViewportWidth(window.innerWidth)
    }
    updateWidth()
    window.addEventListener('resize', updateWidth)
    return () => window.removeEventListener('resize', updateWidth)
  }, [])

  // Wheel zoom logic
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Only allow zooming in (negative deltaY means zoom in)
      if (e.deltaY < 0) {
        const delta = e.deltaY * 0.005
        const newScale = Math.min(Math.max(scale + delta, 1), 2)
        setScale(newScale)
      }
    }

    const container = containerRef.current
    if (!container) return

    container.addEventListener('wheel', handleWheel, { passive: false })
    return () => container.removeEventListener('wheel', handleWheel)
  }, [scale])

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent) => {
    setIsDragging(true)
    setDragStart({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  // Handle dragging
  const handleDrag = (e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    })
  }

  // End drag
  const handleDragEnd = () => {
    setIsDragging(false)
  }

  // Return the appropriate point on the path for each milestone
  const getPointAtProgress = (progress: number) => {
    if (typeof document === 'undefined') return { x: 0, y: 0 }

    const path = document.querySelector('.milestone-path') as SVGPathElement
    if (!path) return { x: 0, y: 0 }

    const length = path.getTotalLength()
    const point = path.getPointAtLength(length * (progress / 100))

    const svgHeight = 545 // from viewBox
    const containerHeight = 800
    const verticalCenter = containerHeight / 2
    const yOffset = verticalCenter - svgHeight / 2

    // Slight offset to better align path visually
    return {
      x: point.x,
      y: point.y + yOffset + 200
    }
  }

  // Stretch/transform the base path to match viewport width
  const getElasticPath = () => {
    const basePathD = `M2944.5 2L1914.34 2H1813.43C1788.09 1.99988 1752.88 6.09955 1739.49 20.8113C1729.98 31.2462 1718.58 52.2039 1751.04 79.3352C1783.5 106.466 1920.5 163.986 1935.13 221.464C1943.46 254.174 1931.11 290.933 1881.22 302.979C1790.32 324.926 1628.03 232.207 1515.34 194.293C1475.03 174.7 1425.87 175.481 1410.58 205.525C1398.22 229.825 1394.41 242.366 1424.45 278.943C1467.24 331.051 1540.33 377.739 1560.01 427.342C1570.8 454.514 1551.82 506.795 1513.03 525.579C1474.23 544.362 1376.41 563.449 1283.78 493.533C1191.14 423.618 28.9201 269.131 2 266`

    // Avoid accidental zero-div if viewportWidth < 2
    if (viewportWidth <= 2) return basePathD

    // Replace numeric positions in the path with scaled positions
    const stretchedPath = basePathD.replace(
      /(-?\d+\.?\d*)/g,
      (match, p1) => {
        const num = parseFloat(p1)

        // We only want to scale large x-values (the path extends to 2944.5)
        // Keep small coords (like '2') from becoming negative
        // This is a simplified approach to avoid messing up y-values too heavily
        if (num >= 2 && num <= 2944.5) {
          // Normalized from 0 to (2944.5 - 2)
          const normalized = (num - 2) / (2942.5)
          const scaled = normalized * (viewportWidth - 2)
          return (scaled + 2).toString()
        }
        return match
      }
    )
    return stretchedPath
  }

  return (
    <div className="w-full flex items-center justify-center min-h-[500px] bg-white/60">
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDrag}
        onMouseLeave={handleDragEnd}
      >
        <motion.div
          className="relative w-screen h-[800px] px-8"
          style={{
            transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
            transformOrigin: "center center",
            transition: isDragging ? "none" : "transform 0.1s ease-out",
            minWidth: "100vw",
            margin: "40px 0"
          }}
        >
          {/* Path with animation */}
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewportWidth} 545`}
            fill="none"
            preserveAspectRatio="xMidYMid meet"
            className="absolute top-[200px] left-0"
            style={{ overflow: "visible" }}
          >
            <motion.path
              className="milestone-path stroke-[#C8D3F1] stroke-[4] fill-none"
              strokeLinecap="round"
              d={getElasticPath()}
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              onAnimationComplete={() => setIsPathAnimationComplete(true)}
            />
          </svg>

          {/* Milestones */}
          <AnimatePresence>
            {isPathAnimationComplete &&
              milestones.map((milestone, index) => {
                const point = getPointAtProgress(milestone.progress)
                return (
                  <motion.div
                    key={milestone.id}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ 
                      opacity: activeMilestone === null || activeMilestone === milestone.id ? 1 : 0,
                      scale: 1 
                    }}
                    transition={{
                      duration: 0.6,
                      delay: activeMilestone === null ? index * 0.15 : 0,
                      ease: "easeOut"
                    }}
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
                      {/* Bottom circle (small icon) */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg cursor-pointer overflow-hidden relative z-[5]"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: activeMilestone === null || activeMilestone === milestone.id ? 1 : 0 
                        }}
                        transition={{
                          duration: 0.4,
                          delay: activeMilestone === null ? index * 0.15 + 0.2 : 0,
                          ease: "easeOut"
                        }}
                      >
                        {/* Check icon on hover */}
                        <motion.div
                          initial={{ opacity: 0, rotate: -45 }}
                          animate={
                            activeMilestone === milestone.id
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

                      {/* Larger icon above (no background) */}
                      <div
                        className="absolute left-1/2 z-[40]"
                        style={{
                          transform: "translateX(calc(-37% - 10px))",
                          top: "-136px"
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={
                            activeMilestone === milestone.id
                              ? { scale: 1, opacity: 1 }
                              : { scale: 0, opacity: 0 }
                          }
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                            delay: activeMilestone === milestone.id ? 0.15 : 0
                          }}
                          className="z-[40] flex items-center justify-center"
                          style={{
                            top: "-136px",
                            transformOrigin: "center center",
                            pointerEvents: "none"
                          }}
                        >
                          <div className="w-24 h-24 flex items-center justify-center">
                            <Image
                              src={`/icons/Step${milestone.id}.svg`}
                              alt={`Step ${milestone.id}`}
                              width={96}
                              height={96}
                              className="w-full h-full"
                              style={{
                                objectFit: 'contain'
                              }}
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Hover info boxes - both left and right */}
                      {activeMilestone === milestone.id && (
                        <>
                          {/* Right card - Step and Title only */}
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: -24,
                              scale: 0.9
                            }}
                            animate={{
                              opacity: 1,
                              x: 24,
                              scale: 1
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.2
                            }}
                            className="absolute z-[35] bg-white rounded-lg shadow-lg p-4"
                            style={{
                              top: "-140px",
                              left: "80%",
                              width: "200px",
                              minHeight: "80px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-blue-600/60 bg-blue-500/10 px-2 py-0.5 rounded-full">
                                Step {milestone.id} of 10
                              </span>
                            </div>
                            <h3 className="font-semibold text-blue-600 text-sm mb-0.5 whitespace-normal">
                              {milestone.title}
                            </h3>
                          </motion.div>

                          {/* Left card with customized content */}
                          <motion.div
                            initial={{
                              opacity: 0,
                              x: 24,
                              scale: 0.9
                            }}
                            animate={{
                              opacity: 1,
                              x: -264,
                              scale: 1
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.2
                            }}
                            className="absolute z-[35] bg-white rounded-lg shadow-lg p-4"
                            style={{
                              top: "-140px",
                              left: "20%",
                              width: "240px",
                              height: "auto",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center"
                            }}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-medium text-blue-600/60 bg-blue-500/10 px-2 py-0.5 rounded-full">
                                {milestone.id === 10 ? "Smart Contract" :
                                 milestone.id === 9 ? "Smart Contract" :
                                 milestone.id === 8 ? "Smart Contract" :
                                 milestone.id === 7 ? "Smart Contract" :
                                 milestone.id === 6 ? "Smart Contract" :
                                 milestone.id === 5 ? "ZKP" :
                                 milestone.id === 4 ? "Fuzzy AI" :
                                 milestone.id === 3 ? "On-ramp Service" :
                                 milestone.id === 2 ? "TEE" :
                                 "TEE"}
                              </span>
                            </div>
                            
                            {/* Top section */}
                            <div className="mb-2">
                              <p className="text-xs text-gray-600">
                                {milestone.description}
                              </p>
                            </div>

                            {/* Divider */}
                            <div className="border-t my-2" />

                            {/* Bottom section - long descriptions */}
                            <div className="text-xs text-gray-500">
                              <p className="text-xs leading-relaxed mb-3">
                                {milestone.id === 10 ? "Manage variable costs based on the energy used during the charging session" :
                                 milestone.id === 9 ? "Manage fixed costs, including rentmaintenance, and insurance." :
                                 milestone.id === 8 ? "The costs (70%) are divided into fixed and variable costs. Fixed costs include rent, maintenance, and insurance, while variable costs cover energy usage." :
                                 milestone.id === 7 ? "The profit (30%) is distributed proportionally to token holders in the Dobprotocol pool" :
                                 milestone.id === 6 ? "The funds are sent to the Dobprotocol profit pool, where the profit and costs are managed." :
                                 milestone.id === 5 ? "Funds are deposited securely using a Zero Knowledge Proof system for privacy-preserving verification." :
                                 milestone.id === 4 ? "The DOBI-CORE AI agent analyzes the validated reports and prepares financial allocations: profit vs costs." :
                                 milestone.id === 3 ? "The payment in fiat is converted to the DOB token using an on-ramp service." :
                                 milestone.id === 2 ? "The accountability system processes RWA reports, validates data for consistency, and ensures proper recording of the transaction" :
                                 "The EV charger operates as a Real World Asset (RWA) and receives a transaction to start charging energy. Generates initial reports on energy usage and payment."}
                              </p>

                              {/* Agent Verified Badge */}
                              <div className="flex items-center">
                                <span className="text-xs text-white bg-green-500 px-2 py-0.5 rounded">
                                  Agent Verified
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        </>
                      )}

                      {/* Vertical connector */}
                      <motion.div
                        initial={{ height: 0, opacity: 0, scaleY: 0 }}
                        animate={
                          activeMilestone === milestone.id
                            ? { height: 64, opacity: 1, scaleY: 1 }
                            : { height: 0, opacity: 0, scaleY: 0 }
                        }
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 w-0.5 bg-blue-400"
                        style={{
                          top: "-64px",
                          transformOrigin: "bottom",
                          zIndex: 25,
                          height: '64px'
                        }}
                      />
                    </motion.div>
                  </motion.div>
                )
              })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default MilestoneRoadmap