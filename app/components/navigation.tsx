"use client"

import { Home, Settings, Terminal, Activity, HelpCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'

export function Navigation() {
  return (
    <div className="border-r w-14 flex flex-col items-center py-4 gap-4">
<TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Home className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Home</TooltipContent>
      </Tooltip>
      <Tooltip>
      
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Activity className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Activity</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Terminal className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Terminal</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
      <div className="flex-1" />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right">Help</TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
  )
}

