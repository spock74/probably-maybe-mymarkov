
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './common/Button';
import { Experiment } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminPanelProps {
    onAddExperiment: (experiment: Experiment) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddExperiment }) => {
    const { t } = useLanguage();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [guideText, setGuideText] = useState('');
    const [prerequisites, setPrerequisites] = useState('');
    const [nodesJson, setNodesJson] = useState('[\n  {"id": "A", "label": "State A"},\n  {"id": "B", "label": "State B"}\n]');
    const [matrixJson, setMatrixJson] = useState('{\n  "A": {"A": 0.5, "B": 0.5},\n  "B": {"A": 0.3, "B": 0.7}\n}');
    const [initialState, setInitialState] = useState('A');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            const nodes = JSON.parse(nodesJson);
            const matrix = JSON.parse(matrixJson);

            // Basic validation
            if (!Array.isArray(nodes) || nodes.length === 0) {
                throw new Error(t('error_nodes_json'));
            }
            if (typeof matrix !== 'object' || matrix === null || Array.isArray(matrix)) {
                throw new Error(t('error_matrix_json'));
            }
            if (!nodes.find(n => n.id === initialState)) {
                throw new Error(t('error_initial_state'));
            }

            const newExperiment: Experiment = {
                id: `custom-${Date.now()}`,
                titleKey: title, // For custom experiments, we can use the title itself as a key or just display it.
                descriptionKey: description,
                guideTextKey: guideText,
                prerequisites: prerequisites.split(',').map(p => p.trim()).filter(Boolean),
                config: {
                    nodes,
                    matrix,
                    initialState,
                },
            };
            onAddExperiment(newExperiment);
        } catch (err) {
            if (err instanceof Error) {
                setError(`${t('error_invalid_config')}: ${err.message}`);
            } else {
                setError(t('error_unknown'));
            }
        }
    };

    const inputClasses = "w-full p-2 bg-[var(--muted)] border border-[var(--border)] rounded-md focus:ring-2 focus:ring-[var(--primary-focus)] focus:outline-none text-[var(--foreground)]";
    const textareaClasses = `${inputClasses} font-mono text-sm min-h-[120px]`;
    const labelClasses = "block mb-1 text-sm font-medium text-[var(--muted-foreground)]";

    return (
        <div className="container mx-auto px-6 py-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-bold mb-2 text-[var(--foreground)]">{t('admin_panel_title')}</h1>
                <p className="text-lg text-[var(--muted-foreground)] mb-8">{t('admin_panel_subtitle')}</p>
            </motion.div>

            <motion.form 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit} 
                className="bg-[var(--card-background)] backdrop-blur-lg border border-[var(--border)] rounded-xl p-8 space-y-6"
            >
                {error && <div className="bg-red-900/50 border border-red-500 text-red-300 p-3 rounded-md">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="title" className={labelClasses}>{t('form_title')}</label>
                        <input id="title" type="text" value={title} onChange={e => setTitle(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="prerequisites" className={labelClasses}>{t('form_prerequisites')}</label>
                        <input id="prerequisites" type="text" value={prerequisites} onChange={e => setPrerequisites(e.target.value)} className={inputClasses} />
                    </div>
                </div>

                <div>
                    <label htmlFor="description" className={labelClasses}>{t('form_description')}</label>
                    <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required className={inputClasses} rows={2}></textarea>
                </div>
                 <div>
                    <label htmlFor="guideText" className={labelClasses}>{t('form_guide_text')}</label>
                    <textarea id="guideText" value={guideText} onChange={e => setGuideText(e.target.value)} required className={inputClasses} rows={4}></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="nodesJson" className={labelClasses}>{t('form_nodes_json')}</label>
                        <textarea id="nodesJson" value={nodesJson} onChange={e => setNodesJson(e.target.value)} required className={textareaClasses}></textarea>
                    </div>
                    <div>
                        <label htmlFor="matrixJson" className={labelClasses}>{t('form_matrix_json')}</label>
                        <textarea id="matrixJson" value={matrixJson} onChange={e => setMatrixJson(e.target.value)} required className={textareaClasses}></textarea>
                    </div>
                </div>

                <div>
                    <label htmlFor="initialState" className={labelClasses}>{t('form_initial_state')}</label>
                    <input id="initialState" type="text" value={initialState} onChange={e => setInitialState(e.target.value)} required className={inputClasses} />
                </div>
                
                <div className="pt-4">
                    <Button type="submit" className="w-full md:w-auto">{t('create_experiment')}</Button>
                </div>

            </motion.form>
        </div>
    );
};

export default AdminPanel;
