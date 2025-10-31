
import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion, Transition } from 'framer-motion';
import { Experiment, User, UserRole } from './types';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import ExperimentView from './components/ExperimentView';
import AdminPanel from './components/AdminPanel';
import { MOCK_EXPERIMENTS } from './data/experiments';

type View = 'login' | 'dashboard' | 'experiment' | 'admin';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<View>('login');
  const [selectedExperiment, setSelectedExperiment] = useState<Experiment | null>(null);
  const [experiments, setExperiments] = useState<Experiment[]>(MOCK_EXPERIMENTS);

  const handleLogin = useCallback((username: string) => {
    const role = username.toLowerCase() === 'admin' ? UserRole.ADMIN : UserRole.LEARNER;
    setUser({ username, role });
    setView('dashboard');
  }, []);

  const handleLogout = useCallback(() => {
    setUser(null);
    setView('login');
    setSelectedExperiment(null);
  }, []);

  const handleSelectExperiment = useCallback((experiment: Experiment) => {
    setSelectedExperiment(experiment);
    setView('experiment');
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedExperiment(null);
    setView('dashboard');
  }, []);

  const handleNavigate = useCallback((newView: View) => {
    setView(newView);
  }, []);

  const handleAddExperiment = useCallback((newExperiment: Experiment) => {
    setExperiments(prev => [...prev, newExperiment]);
    setView('dashboard');
  }, []);


  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 },
  };

  const pageTransition: Transition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5,
  };
  
  return (
    <div className="min-h-screen font-sans bg-[var(--background)] text-[var(--foreground)]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      {user && (
        <Header 
          user={user} 
          onLogout={handleLogout} 
          currentView={view}
          onNavigate={handleNavigate}
        />
      )}

      <main className="pt-20">
        <AnimatePresence mode="wait">
          {view === 'login' && !user && (
            <motion.div
              key="login"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Login onLogin={handleLogin} />
            </motion.div>
          )}

          {view === 'dashboard' && user && (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Dashboard experiments={experiments} onSelectExperiment={handleSelectExperiment} />
            </motion.div>
          )}

          {view === 'experiment' && selectedExperiment && (
             <motion.div
              key="experiment"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <ExperimentView 
                experiment={selectedExperiment} 
                onBack={handleBackToDashboard} 
              />
            </motion.div>
          )}
          
          {view === 'admin' && user?.role === UserRole.ADMIN && (
            <motion.div
              key="admin"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <AdminPanel onAddExperiment={handleAddExperiment}/>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
