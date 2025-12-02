export interface MiniGameIdea {
  id: string;
  name: string;
  icon: string;
  rules: string;
  goal: string;
  example: string;
  leveling: string;
  category: 'logic' | 'arithmetic' | 'geometry' | 'memory';
  type: 'builder' | 'collection' | 'choice' | 'balance' | 'sequence' | 'comparison' | 'drag_match'; 
  grade: 1 | 2 | 3 | 4 | 5;
}

export interface TowerLevel {
  target: number;
  blocks: number[]; 
  solution?: number[];
}

export interface GenericGameLevel {
  question: string;
  target?: number;
  bgTheme?: string;
  options: {
    id: string | number;
    value: any;
    isCorrect?: boolean;
    numericValue?: number;
    content?: string;
    style?: string;
  }[];
  hint?: string;
}

export enum GameState {
  MENU,
  PLAYING,
  WON,
  LOST
}