import DobiChart  from './components/dobi-chart'
import AgentSidebar  from './components/agent-sidebar'
import Navigation  from './components/navigation'

export default function Home() {
  return (
    <div className="flex min-h-screen bg-background">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <header className="border-b">
          <div className="container flex h-14 items-center px-4">
            <h1 className="text-xl font-bold">DOBI Agent</h1>
          </div>
        </header>
        <div className="flex-1 flex">
          <div className="flex-1 p-8">
            <DobiChart />
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h2 className="font-semibold mb-2">Terminal</h2>
              <pre className="font-mono text-sm">
                {`> Initializing DOBI agent...
> Connected to network
> Processing transactions...`}
              </pre>
            </div>
          </div>
          <AgentSidebar />
        </div>
      </main>
    </div>
  )
}

