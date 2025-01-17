import * as React from "react"
import { cn } from "@/lib/utils"

const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-500 text-white", className)} {...props} />
  )
)
Badge.displayName = "Badge"

export { Badge }