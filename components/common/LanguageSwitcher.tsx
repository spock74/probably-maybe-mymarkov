
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import BrazilFlagIcon from '../icons/BrazilFlagIcon';
import USFlagIcon from '../icons/USFlagIcon';
import ChevronDownIcon from '../icons/ChevronDownIcon';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'pt', label: 'Português', Icon: BrazilFlagIcon },
    { code: 'en', label: 'English', Icon: USFlagIcon },
  ];

  const CurrentIcon = language === 'pt' ? BrazilFlagIcon : USFlagIcon;

  return (
    <div className="relative">
      <button onClick={() => setIsOpen(!isOpen)} className="flex items-center gap-1 p-2 rounded-full hover:bg-[var(--muted)] transition-colors">
        <CurrentIcon className="h-5 w-5" />
        <ChevronDownIcon className="h-3 w-3 text-[var(--muted-foreground)]" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-40 bg-[var(--popover-background)] border border-[var(--border)] rounded-lg shadow-lg z-50"
          >
            <ul>
              {languages.map(({ code, label, Icon }) => (
                <li key={code}>
                  <button
                    onClick={() => {
                      setLanguage(code as 'pt' | 'en');
                      setIsOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-[var(--foreground)] hover:bg-[var(--muted)] flex items-center gap-2"
                  >
                    <Icon className="w-5 h-5" />
                    {label}
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

export default LanguageSwitcher;
