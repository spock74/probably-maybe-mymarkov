import React from 'react';
import { EdgeProps, getSmoothStepPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedEdgeData {
  isTraversed?: boolean;
}

const AnimatedEdge: React.FC<EdgeProps<AnimatedEdgeData>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  data,
}) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const isTraversed = data?.isTraversed ?? false;

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              background: 'var(--background)',
              padding: '2px 6px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: 'var(--primary-light)',
              pointerEvents: 'all',
            }}
            className="nodrag nopan"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}

      {/* The transient tracer orb animated with framer-motion */}
      <AnimatePresence>
        {isTraversed && (
          <motion.circle
            r={6}
            fill="var(--primary-focus)"
            style={{ 
              filter: `drop-shadow(0 0 6px var(--primary-light))`,
              offsetPath: `path("${edgePath}")` 
            }}
            initial={{ offsetDistance: "0%", opacity: 1, scale: 0.5 }}
            animate={{ 
              offsetDistance: "100%", 
              opacity: [1, 1, 0], 
              scale: [1, 1.4, 1] 
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: "easeInOut",
              opacity: { duration: 1.2, times: [0, 0.8, 1] }, // Stay visible for 80% of the duration, then fade
              scale: { duration: 1.2, times: [0, 0.5, 1] } // Grow until halfway, then shrink
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default AnimatedEdge;