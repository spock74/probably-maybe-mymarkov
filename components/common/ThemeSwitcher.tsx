
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, Theme } from '../../contexts/ThemeContext';
import PaletteIcon from '../icons/PaletteIcon';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';

const themes: { name: Theme; icon?: React.ComponentType<{className?: string}> }[] = [
    { name: 'light', icon: SunIcon },
    { name: 'dark', icon: MoonIcon },
    { name: 'dracula' },
    { name: 'deep-ocean' },
    { name: 'matrix' },
    { name: 'neon-dark' },
];

const ThemeSwitcher: React.FC = () => {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
        <PaletteIcon className="h-5 w-5 text-[var(--muted-foreground)]" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-48 bg-[var(--popover-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
          >
            <ul>
              {themes.map(({ name, icon: Icon }) => (
                <li key={name}>
                  <button
                    onClick={() => {
                      setTheme(name);
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center gap-2 capitalize"
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher;
