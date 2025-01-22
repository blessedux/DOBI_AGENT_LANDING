"use client";

import React from "react";

export default function BackgroundScene() {
  return (
    <iframe
      src="https://my.spline.design/retrofuturisticcircuitloop-a70718a3187b50eb7d2706356685f3b6/"
      frameBorder="0"
      width="100%"
      height="100%"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -2, // Ensure it's behind all other elements
        pointerEvents: "none", // Allows interactions with overlays
        opacity: 0.8, // Adjust this value to control background intensity
      }}
      allowFullScreen
    ></iframe>
  );
} 