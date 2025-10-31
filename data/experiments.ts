
import { Experiment } from '../types';

export const MOCK_EXPERIMENTS: Experiment[] = [
  {
    id: 'weather-simple',
    titleKey: 'exp_weather_title',
    descriptionKey: 'exp_weather_desc',
    prerequisites: ['Basic Probability'],
    guideTextKey: 'exp_weather_guide',
    config: {
      nodes: [
        { id: 'sunny', label: 'Sunny' },
        { id: 'rainy', label: 'Rainy' },
      ],
      matrix: {
        sunny: { sunny: 0.9, rainy: 0.1 },
        rainy: { sunny: 0.5, rainy: 0.5 },
      },
      initialState: 'sunny',
    },
  },
  {
    id: 'random-walk',
    titleKey: 'exp_walk_title',
    descriptionKey: 'exp_walk_desc',
    prerequisites: ['Stochastic Processes'],
    guideTextKey: 'exp_walk_guide',
    config: {
      nodes: [
        { id: 'A', label: 'Pos A' },
        { id: 'B', label: 'Pos B' },
        { id: 'C', label: 'Pos C' },
        { id: 'D', label: 'Pos D' },
        { id: 'E', label: 'Pos E' },
      ],
      matrix: {
        A: { B: 1.0 },
        B: { A: 0.5, C: 0.5 },
        C: { B: 0.5, D: 0.5 },
        D: { C: 0.5, E: 0.5 },
        E: { D: 1.0 },
      },
      initialState: 'C',
    },
  },
  {
    id: 'brand-loyalty',
    titleKey: 'exp_brand_title',
    descriptionKey: 'exp_brand_desc',
    prerequisites: ['Statistics', 'Frequentism'],
    guideTextKey: 'exp_brand_guide',
    config: {
      nodes: [
        { id: 'alpha', label: 'AlphaCola' },
        { id: 'beta', label: 'BetaDrink' },
      ],
      matrix: {
        alpha: { alpha: 0.7, beta: 0.3 },
        beta: { alpha: 0.2, beta: 0.8 },
      },
      initialState: 'alpha',
    },
  },
  {
    id: 'entropy-info',
    titleKey: 'exp_entropy_title',
    descriptionKey: 'exp_entropy_desc',
    prerequisites: ['Causality vs Correlation', 'Ergodicity'],
    guideTextKey: 'exp_entropy_guide',
    config: {
      nodes: [
        { id: 'S1', label: 'State 1' },
        { id: 'S2', label: 'State 2' },
        { id: 'S3', label: 'State 3' },
      ],
      matrix: {
        S1: { S2: 1.0 },
        S2: { S1: 0.5, S3: 0.5 },
        S3: { S1: 0.8, S2: 0.2 },
      },
      initialState: 'S1',
    },
  },
];
