import React from 'react';
import { EdgeProps, getSmoothStepPath, BaseEdge, EdgeLabelRenderer } from 'reactflow';

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

      {/* The transient tracer orb */}
      {isTraversed && (
          <circle
            r={5}
            fill="var(--primary-focus)"
            style={{ filter: 'drop-shadow(0 0 5px var(--primary-light))' }}
          >
            <animateMotion
              dur="1.2s"
              begin="0s"
              fill="remove"
              repeatCount="1"
              path={edgePath}
            />
          </circle>
      )}
    </>
  );
};

export default AnimatedEdge;
