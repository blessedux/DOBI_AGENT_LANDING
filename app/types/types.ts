export interface Charger {
  id_charger: string;
  status: string;
  // ... other charger properties
}

export interface AgentSidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  selectedDevice: Device | null;
  setSelectedDevice: (device: Device | null) => void;
  // Add new properties if needed
}

export interface BubbleMapProps {
  isOverlayVisible: boolean;
  selectedView: 'chargerDetails' | 'dobichart' | null;
  // Add new properties if needed
}

export interface VectorWindowProps {
  isWindowOpen: boolean;
  // Add new properties if needed
}

// Define Device type if not already defined
export interface Device {
  id: string;
  name: string;
  // ... other device properties ...
} 