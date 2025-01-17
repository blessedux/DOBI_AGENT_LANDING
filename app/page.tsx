import DobiChart from './components/DobiChart'
import { AgentSidebar } from './components/agent-sidebar'
import { Card } from "./components/ui/card/card"
import { Chart } from "@/components/ui/chart"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <main className="flex-1 flex flex-col items-center justify-center">
        <header className="border-b w-full">
          <div className="container flex h-14 items-center px-4">
            <h1 className="text-xl font-bold">DOBI Agent</h1>
          </div>
        </header>

        <div className="flex flex-1 w-full max-w-4xl p-8 gap-6">
          {/* Center the Chart */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <DobiChart />
            <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
              <h2 className="font-semibold mb-2">Terminal</h2>
              <pre className="font-mono text-sm">
                {`> Initializing DOBI agent...
> Connected to network
> Processing transactions...`}
              </pre>
            </div>
          </div>

          {/* Sidebar on the right */}
          <AgentSidebar />
        </div>
      </main>
    </div>
  )
}