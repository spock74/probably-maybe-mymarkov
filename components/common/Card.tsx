
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface CardProps {
  title: string;
  description: string;
  tags: string[];
  onClick: () => void;
}

// FIX: Explicitly type cardVariants to resolve TypeScript error with framer-motion Variants type.
const cardVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const Card: React.FC<CardProps> = ({ title, description, tags, onClick }) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -5, boxShadow: '0 25px 50px -12px var(--primary-shadow)' }}
      onClick={onClick}
      className="bg-[var(--card-background)] backdrop-blur-lg border border-[var(--border)] rounded-xl p-6 cursor-pointer overflow-hidden relative group"
    >
      <div className="absolute top-0 right-0 h-16 w-16 bg-[var(--primary)]/20 blur-2xl group-hover:h-32 group-hover:w-32 transition-all duration-500"></div>
      <h3 className="text-xl font-bold text-[var(--primary-light)] mb-2">{title}</h3>
      <p className="text-[var(--muted-foreground)] mb-4 text-sm">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-xs bg-[var(--primary-dark)]/50 text-[var(--primary-light)] px-2 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default Card;
