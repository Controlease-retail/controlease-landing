// import React from 'react';
import { cn } from '../../utils/cn';

interface DataStreamProps {
  d?: string; // SVG path definition
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
  duration?: number;
}

export const DataStream: React.FC<DataStreamProps> = ({ 
  d = "M0,50 Q50,0 100,50 T200,50", 
  width = "100%", 
  height = 100,
  className,
  color, // Will use CSS variable if not provided
  duration = 2
}) => {
  // Use primary color from theme if not specified
  const strokeColor = color || 'var(--color-primary)';
  
  return (
    <div className={cn("pointer-events-none overflow-visible", className)}>
      <svg 
        width={width} 
        height={height} 
        viewBox={`0 0 ${typeof width === 'number' ? width : 200} ${typeof height === 'number' ? height : 100}`}
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Base Path (dim) */}
        <path 
          d={d} 
          stroke={strokeColor} 
          strokeOpacity="0.1" 
          strokeWidth="1" 
        />
        
        {/* Animated Pulse Path */}
        <path 
          d={d} 
          stroke={strokeColor} 
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="10 100" // Short dash (packet), long gap
          className="animate-stream"
          style={{
            animationDuration: `${duration}s`,
            stroke: strokeColor
          }}
        />
      </svg>
      <style>{`
        @keyframes stream {
          from { stroke-dashoffset: 110; }
          to { stroke-dashoffset: 0; }
        }
        .animate-stream {
          animation: stream linear infinite;
        }
      `}</style>
    </div>
  );
};
