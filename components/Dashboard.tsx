
import React from 'react';
import { motion } from 'framer-motion';
import { Experiment } from '../types';
import Card from './common/Card';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  experiments: Experiment[];
  onSelectExperiment: (experiment: Experiment) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const Dashboard: React.FC<DashboardProps> = ({ experiments, onSelectExperiment }) => {
  const { t } = useLanguage();
  return (
    <div className="container mx-auto px-6 py-8">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">{t('dashboard_title')}</h1>
        <p className="text-lg text-[var(--muted-foreground)] mb-8">{t('dashboard_subtitle')}</p>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {experiments.map((exp) => (
          <Card
            key={exp.id}
            title={t(exp.titleKey)}
            description={t(exp.descriptionKey)}
            tags={exp.prerequisites}
            onClick={() => onSelectExperiment(exp)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
