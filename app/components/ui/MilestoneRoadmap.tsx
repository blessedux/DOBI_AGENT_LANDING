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
  const [scale, setScale] = useState(0.7)
  const minScale = 0.5
  const maxScale = 1.2
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [position, setPosition] = useState({ x: 10, y: 0 })

  // Track viewport width for dynamic path scaling
  const [viewportWidth, setViewportWidth] = useState(0)

  // Pulsing animation logic
  const [pulsingMilestone, setPulsingMilestone] = useState(1)
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsingMilestone(current => (current === 10 ? 1 : current + 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
      if (e.ctrlKey || e.metaKey) { // Check for pinch gesture on mobile
        e.preventDefault();
        const delta = -e.deltaY * 0.01;
        setScale(prevScale => {
          const newScale = prevScale + delta;
          return Math.min(Math.max(newScale, minScale), maxScale);
        });
      }
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [scale]);

  // Update zoom handlers with better sensitivity
  useEffect(() => {
    let initialDistance = 0;
    let initialScale = scale;

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        initialDistance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        initialScale = scale;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        const distance = Math.hypot(
          e.touches[0].pageX - e.touches[1].pageX,
          e.touches[0].pageY - e.touches[1].pageY
        );
        
        const delta = (distance - initialDistance) * 0.015; // Increased from 0.01
        const newScale = Math.min(Math.max(initialScale + delta, minScale), maxScale);
        setScale(newScale);
      }
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [scale]);

  // Update drag handlers with improved sensitivity
  useEffect(() => {
    let startTouch = { x: 0, y: 0 };
    let startPos = { x: 0, y: 0 };
    let isActive = false;
    let moveThreshold = 1; // Reduced from 3 for more immediate response

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        startTouch = { x: touch.clientX, y: touch.clientY };
        startPos = { ...position };
        isActive = true;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isActive || e.touches.length !== 1) return;

      const touch = e.touches[0];
      const deltaX = (touch.clientX - startTouch.x) * 1.2; // Added multiplier for more responsive movement
      const deltaY = (touch.clientY - startTouch.y) * 1.2;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance > moveThreshold) {
        e.preventDefault();
        setPosition({
          x: startPos.x + deltaX,
          y: startPos.y + deltaY
        });
      }
    };

    const handleTouchEnd = () => {
      isActive = false;
    };

    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('touchstart', handleTouchStart);
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [position]);

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

  // Add this helper function to calculate center position
  const centerOnMilestone = (milestoneId: number) => {
    const point = getPointAtProgress(milestones.find(m => m.id === milestoneId)?.progress || 0);
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const newX = -(point.x - containerWidth / 2);
      
      // Animate to new position
      setPosition(prev => ({
        ...prev,
        x: newX
      }));
    }
  };

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
            margin: "40px 0",
            marginLeft: typeof window !== 'undefined' && window.innerWidth < 768 ? "-80px" : "0"
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
              style={{ zIndex: 1 }}
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
                      opacity: 1,
                      scale: 1 
                    }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.15,
                      ease: "easeOut"
                    }}
                    style={{
                      left: point.x,
                      top: point.y,
                      transform: "translate(-50%, -50%)",
                      zIndex: activeMilestone === milestone.id ? 50 : 10
                    }}
                  >
                    <motion.div
                      className="relative"
                      onHoverStart={() => !isMobile && setActiveMilestone(milestone.id)}
                      onHoverEnd={() => !isMobile && setActiveMilestone(null)}
                      onClick={() => {
                        if (isMobile) {
                          if (activeMilestone === milestone.id) {
                            setActiveMilestone(null);
                          } else {
                            setActiveMilestone(milestone.id);
                            centerOnMilestone(milestone.id); // Add centering on activation
                          }
                        }
                      }}
                    >
                      {/* Bottom circle (small icon) */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white shadow-lg cursor-pointer overflow-hidden relative z-[5]"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ 
                          scale: 1, 
                          opacity: 1
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.15 + 0.2,
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
                        className="absolute left-1/2 z-[35]"
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
                          className="z-[35] flex items-center justify-center"
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
                              ...(isMobile 
                                ? { y: 100, x: -100 } // Start from below on mobile
                                : { x: -24 }
                              ),
                              scale: 0.9
                            }}
                            animate={{
                              opacity: 1,
                              ...(isMobile 
                                ? { y: -70, x: -100 } // Move up on mobile
                                : { x: 24 }
                              ),
                              scale: 1
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.2
                            }}
                            className="absolute z-[25] bg-white rounded-lg shadow-lg p-4"
                            style={{
                              ...(isMobile 
                                ? {
                                    top: "-140px", // Position much higher for mobile
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "280px"
                                  }
                                : {
                                    top: "-140px",
                                    left: "80%",
                                    width: "200px"
                                  }
                              ),
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
                              ...(isMobile 
                                ? { y: 100, x: -100 } // Start from below on mobile
                                : { x: 24 }
                              ),
                              scale: 0.9
                            }}
                            animate={{
                              opacity: 1,
                              ...(isMobile 
                                ? { y: -280, x: -100 } // Move up higher on mobile
                                : { x: -264 }
                              ),
                              scale: 1
                            }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                              delay: 0.2
                            }}
                            className="absolute z-[25] bg-white rounded-lg shadow-lg p-4"
                            style={{
                              ...(isMobile 
                                ? {
                                    top: "-140px", // Position much higher for mobile
                                    left: "50%",
                                    transform: "translateX(-50%)",
                                    width: "280px"
                                  }
                                : {
                                    top: "-140px",
                                    left: "20%",
                                    width: "240px"
                                  }
                              ),
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