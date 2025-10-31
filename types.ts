
import { Node, Edge } from 'reactflow';

export interface MarkovNodeData {
  label: string;
  isCurrent?: boolean;
}

export type MarkovNodeType = Node<MarkovNodeData>;

export interface MarkovChainConfig {
  nodes: { id: string; label: string }[];
  matrix: { [key: string]: { [key: string]: number } };
  initialState: string;
}

export interface Experiment {
  id: string;
  titleKey: string;
  descriptionKey: string;
  prerequisites: string[];
  guideTextKey: string;
  config: MarkovChainConfig;
}

export enum UserRole {
  LEARNER = 'learner',
  ADMIN = 'admin',
}

export interface User {
  username: string;
  role: UserRole;
}
