"use client";

import { animated, useSpring } from "@react-spring/web";
import { useState } from "react";

export default function BubbleMap() {
  const [hovered, setHovered] = useState(false);

  // Simple spring animation
  const styles = useSpring({
    transform: hovered ? "scale(1.2)" : "scale(1)",
    config: { tension: 200, friction: 10 },
  });

  return (
    <div className="flex justify-center items-center h-full w-full">
      <animated.div
        className="w-20 h-20 bg-blue-500 rounded-full flex justify-center items-center text-white font-bold cursor-pointer"
        style={styles}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        🚗
      </animated.div>
    </div>
  );
}