"use client";

import React, { useEffect, useState } from "react";

const GlassmorphismWindow: React.FC = () => {
  const [text, setText] = useState("");
  const fullText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit."; // Placeholder text

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < fullText.length) {
        setText((prev) => prev + fullText[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust typing speed here

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 left-4 z-30 p-4 rounded-lg backdrop-blur-md bg-gray-800/50 border border-gray-300 shadow-lg">
      <h2 className="text-white text-lg font-bold">Info</h2>
      <p className="text-gray-200">{text}</p>
    </div>
  );
};

export default GlassmorphismWindow; 