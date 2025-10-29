// FIX: import ComponentType from React to resolve 'Cannot find namespace 'React'' error.
import type { ComponentType } from 'react';

export enum GameState {
  HOME = 'HOME',
  SERVING = 'SERVING',
  MANAGEMENT = 'MANAGEMENT',
  LEVEL_UP = 'LEVEL_UP',
}

export enum ProblemType {
  ADDITION = 'Penjumlahan',
  SUBTRACTION = 'Pengurangan',
  MULTIPLICATION = 'Perkalian',
  DIVISION = 'Pembagian',
}

export interface Problem {
  question: string;
  answer: number;
  type: ProblemType;
}

export interface Level {
  level: number;
  shopName: string;
  xpToNextLevel: number;
  problemTypes: ProblemType[];
  customersPerDay: number;
}

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  // FIX: Use ComponentType instead of React.ComponentType
  icon: ComponentType<{ className?: string }>;
  type: 'ITEM' | 'DECORATION';
}