// components/ui/scroll-area.tsx
"use client"

import * as React from "react"
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area"

export function ScrollArea({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <ScrollAreaPrimitive.Root className={`relative overflow-auto ${className}`}>
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-md">
        {children}
      </ScrollAreaPrimitive.Viewport>
    </ScrollAreaPrimitive.Root>
  )
}