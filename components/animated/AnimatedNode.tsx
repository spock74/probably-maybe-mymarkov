import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NodeProps } from 'reactflow';
import { MarkovNodeData } from '../../types';

const AnimatedNode: React.FC<NodeProps<MarkovNodeData>> = ({ data }) => {
  const { label, isCurrent } = data;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="relative flex items-center justify-center"
      style={{ width: 150, height: 50 }} // Use fixed size for layout stability
    >
      <motion.div
        layout // Animate style changes smoothly
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={`
          w-full h-full flex items-center justify-center
          px-4 py-2 rounded-lg shadow-md border-2 
          ${isCurrent ? 'bg-[var(--primary)] border-[var(--primary-light)] text-white shadow-[var(--primary-shadow)]' : 'bg-[var(--muted)] border-[var(--border)] text-[var(--foreground)]'}
          relative z-10
        `}
      >
        {label}
      </motion.div>
      <AnimatePresence>
        {isCurrent && (
          <motion.div
            key="pulse"
            initial={{ scale: 1, opacity: 0 }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0, 0.6, 0],
            }}
            exit={{ scale: 1, opacity: 0 }}
            transition={{
              duration: 2,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            className="absolute w-full h-full bg-[var(--primary-focus)] rounded-lg z-0"
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnimatedNode;