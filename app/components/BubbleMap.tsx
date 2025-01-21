"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function BubbleMap({ isVisible, onClose }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose} // Click outside to close
        >
          {/* BubbleMap Window */}
          <motion.div
            className="relative bg-white w-[500px] h-[500px] rounded-lg shadow-lg p-5 flex flex-col items-center justify-center"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <h2 className="text-2xl font-bold text-[#2D4EC8]">Bubble Map</h2>
            <p className="text-gray-600">Device relationships will go here.</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}