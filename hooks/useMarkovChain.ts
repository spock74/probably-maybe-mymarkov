
import { useState, useCallback, useMemo } from 'react';
import { MarkovChainConfig } from '../types';

export const useMarkovChain = (config: MarkovChainConfig) => {
  const { matrix, initialState } = config;

  const [currentState, setCurrentState] = useState<string>(initialState);
  const [previousState, setPreviousState] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([initialState]);
  
  const stateCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    for(const node of config.nodes) {
      counts[node.id] = 0;
    }
    history.forEach(state => {
      counts[state] = (counts[state] || 0) + 1;
    });
    return counts;
  }, [history, config.nodes]);
  
  const step = useCallback(() => {
    const transitions = matrix[currentState];
    if (!transitions) return;

    let rand = Math.random();
    let nextState = '';

    for (const [state, probability] of Object.entries(transitions)) {
      if (rand < probability) {
        nextState = state;
        break;
      }
      rand -= probability;
    }

    if (nextState) {
      setPreviousState(currentState);
      setCurrentState(nextState);
      setHistory(prev => [...prev, nextState]);
    }
  }, [currentState, matrix]);

  const reset = useCallback(() => {
    setCurrentState(initialState);
    setHistory([initialState]);
    setPreviousState(null);
  }, [initialState]);

  return { currentState, previousState, history, stateCounts, step, reset };
};
