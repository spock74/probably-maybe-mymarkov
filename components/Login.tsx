
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './common/Button';
import BrainCircuitIcon from './icons/BrainCircuitIcon';
import { useLanguage } from '../contexts/LanguageContext';

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username);
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md p-8 space-y-8 bg-[var(--card-background)] backdrop-blur-lg border border-[var(--border)] rounded-2xl shadow-2xl shadow-[var(--primary-shadow)]"
      >
        <motion.div variants={itemVariants} className="text-center">
            <BrainCircuitIcon className="mx-auto h-16 w-16 text-[var(--primary-focus)]" />
            <h2 className="mt-6 text-3xl font-extrabold text-[var(--foreground)]">{t('welcome')}</h2>
            <p className="mt-2 text-[var(--muted-foreground)]">{t('login_prompt')}</p>
            <p className="mt-1 text-xs text-gray-500">{t('login_admin_hint')}</p>
        </motion.div>
        <motion.form variants={itemVariants} className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--border)] bg-[var(--muted)] placeholder-[var(--muted-foreground)] text-[var(--foreground)] rounded-t-md focus:outline-none focus:ring-[var(--primary-focus)] focus:border-[var(--primary-focus)] focus:z-10 sm:text-sm"
                placeholder={t('username_placeholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-[var(--border)] bg-[var(--muted)] placeholder-[var(--muted-foreground)] text-[var(--foreground)] rounded-b-md focus:outline-none focus:ring-[var(--primary-focus)] focus:border-[var(--primary-focus)] focus:z-10 sm:text-sm"
                placeholder={t('password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {t('sign_in')}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
