declare module 'reactflow';
declare module '@react-spring/web';
declare module 'framer-motion';

// Add any missing prop types here for quick fixes
interface BubbleMapProps {
  activeTab: string;
  isOverlayVisible: boolean;
  selectedView: 'chargerDetails' | 'dobichart' | null;
  selectedChargerId?: string;
}

interface GlassmorphismWindowProps {
  activeTab?: string;
  children?: React.ReactNode;
} 