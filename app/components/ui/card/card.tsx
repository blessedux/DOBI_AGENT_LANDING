import * as React from "react"

interface CardProps {
  category: string;
  imageSrc: string;
  title: string;
  buttonText: string;
  position?: { top: string; left: string }; // Allows positioning cards dynamically
}

export function Card({ category, imageSrc, title, buttonText, position }: CardProps) {
  return (
    <div
      className="bg-[#D3DAF5] p-4 rounded-xl w-64 shadow-md flex flex-col items-center text-center relative transition-all hover:scale-105"
      style={position}
    >
      {/* Category Label */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-transparent px-4 py-1 text-lg font-bold text-[#4A60DD]">
        {category}
      </div>

      {/* Card Content */}
      <div className="bg-white rounded-lg p-6 w-full mt-4">
        <img src={imageSrc} alt={title} className="h-20 mx-auto mb-4" />
        <h2 className="text-[#4A60DD] font-bold text-xl">{title}</h2>
      </div>

      {/* Button */}
      <button className="bg-[#A2A2FF] text-white font-bold py-2 px-6 rounded-full mt-4">
        {buttonText}
      </button>
    </div>
  )
}