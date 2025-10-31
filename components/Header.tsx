
import React from 'react';
import { motion } from 'framer-motion';
import { User, UserRole } from '../types';
import Button from './common/Button';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import ThemeSwitcher from './common/ThemeSwitcher';
import LanguageSwitcher from './common/LanguageSwitcher';
import { useLanguage } from '../contexts/LanguageContext';

interface HeaderProps {
  user: User;
  onLogout: () => void;
  currentView: string;
  onNavigate: (view: 'dashboard' | 'admin') => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, currentView, onNavigate }) => {
  const { t } = useLanguage();

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--background)]/50 backdrop-blur-lg border-b border-[var(--border)]"
    >
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <BrainCircuitIcon className="h-8 w-8 text-[var(--primary-focus)]" />
          <h1 className="text-xl font-bold text-[var(--foreground)] tracking-wider">{t('app_title_short')}</h1>
        </div>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <LanguageSwitcher />
          {user.role === UserRole.ADMIN && (
            <div className="hidden sm:flex items-center bg-[var(--muted)] rounded-lg p-1">
              <Button 
                onClick={() => onNavigate('dashboard')} 
                variant={currentView === 'dashboard' || currentView === 'experiment' ? 'primary' : 'secondary'}
                className={`text-sm py-1 px-3 ${currentView !== 'dashboard' && currentView !== 'experiment' ? 'bg-transparent border-none shadow-none text-[var(--foreground)]' : ''}`}
              >
                {t('learner')}
              </Button>
              <Button 
                onClick={() => onNavigate('admin')} 
                variant={currentView === 'admin' ? 'primary' : 'secondary'}
                className={`text-sm py-1 px-3 ${currentView !== 'admin' ? 'bg-transparent border-none shadow-none text-[var(--foreground)]' : ''}`}
              >
                {t('admin')}
              </Button>
            </div>
          )}
          <span className="text-[var(--muted-foreground)] hidden md:block">{t('welcome_user', { username: user.username })}</span>
          <Button onClick={onLogout} variant="secondary">{t('logout')}</Button>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
