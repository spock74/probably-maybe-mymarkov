import React from 'react';
import { motion } from 'framer-motion';
import { NodeProps } from 'reactflow';
import { MarkovNodeData } from '../../types';

const AnimatedNode: React.FC<NodeProps<MarkovNodeData>> = ({ data }) => {
  const { label, isCurrent } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative"
    >
      <div
        className={`
          px-4 py-2 rounded-lg shadow-md border-2 
          ${isCurrent ? 'bg-[var(--primary)] border-[var(--primary-light)] text-white shadow-[var(--primary-shadow)]' : 'bg-[var(--muted)] border-[var(--border)] text-[var(--foreground)]'}
          transition-all duration-300 relative z-10
        `}
      >
        {label}
      </div>
      {isCurrent && (
        <motion.div
          className="absolute inset-0 bg-[var(--primary-focus)] rounded-lg z-0"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      )}
    </motion.div>
  );
};

export default AnimatedNode;
