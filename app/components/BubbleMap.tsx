import { useSpring, animated } from "@react-spring/web";

// Bubble data structure
const bubbles = [
  { id: 1, label: "Electricity Payment Pool" },
  { id: 2, label: "Validator Amount" },
  { id: 3, label: "Payment Pool" },
  { id: 4, label: "Agent Validator Oracle (IoT)" },
  { id: 5, label: "Stream Income" },
];

export default function BubbleMap({ isVisible }) {
  if (!isVisible) return null; // Hide when not active

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Center Bubble - Device */}
      <div className="absolute w-24 h-24 bg-blue-500 text-white flex items-center justify-center rounded-full shadow-md">
        Device
      </div>

      {/* Outer Bubbles */}
      {bubbles.map((bubble, index) => {
        // Spring-based smooth animation
        const bubbleSpring = useSpring({
          x: Math.cos((index / bubbles.length) * Math.PI * 2) * 150,
          y: Math.sin((index / bubbles.length) * Math.PI * 2) * 150,
          config: { tension: 100, friction: 20 },
        });

        return (
          <animated.div
            key={bubble.id}
            style={bubbleSpring}
            className="absolute w-20 h-20 bg-green-500 text-white flex items-center justify-center rounded-full shadow-md cursor-pointer"
          >
            {bubble.label}
          </animated.div>
        );
      })}
    </div>
  );
}