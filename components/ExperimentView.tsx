import React, { useMemo, useEffect, useState } from 'react';
import ReactFlow, { MiniMap, Controls, Background, Node, Edge, MarkerType } from 'reactflow';
import { motion } from 'framer-motion';
import { Experiment, MarkovNodeType } from '../types';
import { useMarkovChain } from '../hooks/useMarkovChain';
import { getLayoutedElements } from '../lib/getLayoutedElements';
import Button from './common/Button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { useLanguage } from '../contexts/LanguageContext';
import AnimatedNode from './animated/AnimatedNode';
import AnimatedEdge from './animated/AnimatedEdge';

const nodeTypes = { animatedNode: AnimatedNode };
const edgeTypes = { animatedEdge: AnimatedEdge };

interface ExperimentViewProps {
  experiment: Experiment;
  onBack: () => void;
}

const ExperimentView: React.FC<ExperimentViewProps> = ({ experiment, onBack }) => {
  const { currentState, previousState, history, stateCounts, step, reset } = useMarkovChain(experiment.config);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const { t } = useLanguage();

  const chartData = useMemo(() => {
    return Object.entries(stateCounts).map(([name, value]) => ({ name, count: value }));
  }, [stateCounts]);

  useEffect(() => {
    const initialNodes: MarkovNodeType[] = experiment.config.nodes.map(node => ({
      id: node.id,
      type: 'animatedNode',
      data: { label: node.label, isCurrent: node.id === experiment.config.initialState },
      position: { x: 0, y: 0 },
    }));

    const initialEdges: Edge[] = [];
    Object.entries(experiment.config.matrix).forEach(([sourceId, transitions]) => {
      Object.entries(transitions).forEach(([targetId, probability]) => {
        initialEdges.push({
          id: `${sourceId}-${targetId}`,
          source: sourceId,
          target: targetId,
          type: 'animatedEdge',
          data: { isTraversed: false },
          label: `${probability * 100}%`,
          style: { stroke: 'var(--primary-focus)', strokeWidth: 2, transition: 'stroke 0.3s ease, stroke-width 0.3s ease' },
          markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--primary-focus)' },
        });
      });
    });

    const { layoutedNodes, layoutedEdges } = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiment.id]);

  useEffect(() => {
    setNodes((nds) =>
      nds.map((node) => ({
        ...node,
        data: {
          ...node.data,
          isCurrent: node.id === currentState,
        },
      }))
    );

    setEdges((eds) =>
        eds.map((edge) => {
            const isTraversedEdge = edge.source === previousState && edge.target === currentState;
            
            return {
                ...edge,
                data: {
                    ...edge.data,
                    isTraversed: isTraversedEdge,
                },
                style: {
                    ...edge.style,
                    stroke: isTraversedEdge ? 'var(--primary-light)' : 'var(--primary-focus)',
                    strokeWidth: isTraversedEdge ? 3 : 2,
                },
                markerEnd: {
                    ...(typeof edge.markerEnd === 'object' && edge.markerEnd ? edge.markerEnd : { type: MarkerType.ArrowClosed }),
                    color: isTraversedEdge ? 'var(--primary-light)' : 'var(--primary-focus)',
                }
            };
        })
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentState, previousState]);

  const runMultipleSteps = (count: number) => {
    for (let i = 0; i < count; i++) {
        setTimeout(() => step(), i * 50);
    }
  };


  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col md:flex-row p-4 gap-4">
        {/* Left Panel */}
        <motion.div 
            initial={{x: -300, opacity: 0}}
            animate={{x: 0, opacity: 1}}
            transition={{duration: 0.5, ease: "easeOut"}}
            className="w-full md:w-1/3 h-full bg-[var(--card-background)] backdrop-blur-lg border border-[var(--border)] rounded-xl flex flex-col p-6 overflow-y-auto"
        >
            <Button onClick={onBack} variant="secondary" className="mb-4 self-start">
                &larr; {t('back_to_dashboard')}
            </Button>
            <h2 className="text-3xl font-bold text-[var(--primary-light)] mb-2">{t(experiment.titleKey)}</h2>
            <p className="text-[var(--muted-foreground)] mb-6">{t(experiment.guideTextKey)}</p>
            
            <div className="bg-[var(--background)]/50 p-4 rounded-lg mb-6">
                <h3 className="font-semibold mb-2 text-lg text-[var(--foreground)]">{t('simulation_controls')}</h3>
                <div className="flex gap-2 flex-wrap">
                    <Button onClick={step} title={t('tooltip_step_once')}>{t('step_once')}</Button>
                    <Button onClick={() => runMultipleSteps(10)} title={t('tooltip_run_10_steps')}>{t('run_10_steps')}</Button>
                    <Button onClick={() => runMultipleSteps(100)} title={t('tooltip_run_100_steps')}>{t('run_100_steps')}</Button>
                    <Button onClick={reset} variant="secondary" title={t('tooltip_reset')}>{t('reset')}</Button>
                </div>
            </div>

            <div className="bg-[var(--background)]/50 p-4 rounded-lg mb-6 flex-grow">
                <h3 className="font-semibold mb-2 text-lg text-[var(--foreground)]">{t('statistics')}</h3>
                <p className="text-[var(--muted-foreground)]">{t('current_state')}: <span className="font-bold text-[var(--primary-focus)]">{currentState}</span></p>
                <p className="text-[var(--muted-foreground)]">{t('total_steps')}: <span className="font-bold text-[var(--primary-focus)]">{history.length - 1}</span></p>
                <div className="mt-4 h-64">
                    <h4 className="font-medium text-[var(--foreground)] mb-2">{t('state_counts')}</h4>
                    <ResponsiveContainer width="100%" height="100%" debounce={100}>
                        <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                            <XAxis dataKey="name" stroke="var(--chart-axis)" />
                            <YAxis stroke="var(--chart-axis)" allowDecimals={false}/>
                            <Tooltip contentStyle={{ backgroundColor: 'var(--popover-background)', border: '1px solid var(--border)' }}/>
                            <Bar dataKey="count" fill="var(--chart-bar)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </motion.div>

        {/* Right Panel */}
        <motion.div 
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{delay: 0.3, duration: 0.5}}
            className="w-full md:w-2/3 h-full rounded-xl overflow-hidden border border-[var(--border)]"
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                className="bg-[var(--background)]"
            >
                <MiniMap nodeColor={(n) => n.data.isCurrent ? 'var(--primary)' : 'var(--muted-foreground)'} />
                <Controls />
                <Background color="var(--muted-foreground)" gap={16} />
            </ReactFlow>
        </motion.div>
    </div>
  );
};

export default ExperimentView;