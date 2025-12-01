export interface MiniGameIdea {
  id: string;
  name: string;
  icon: string;
  rules: string;
  goal: string;
  example: string;
  leveling: string;
  category: 'logic' | 'arithmetic' | 'geometry' | 'memory';
  type: 'builder' | 'collection' | 'choice' | 'balance' | 'sequence'; 
  grade: 1 | 2 | 3 | 4 | 5; // Added grade level
}

export interface TowerLevel {
  target: number;
  blocks: number[]; 
  solution?: number[];
}

export interface GenericGameLevel {
  question: string;
  target?: number; // For collection/balance games
  bgTheme?: string; // To trigger specific CSS backgrounds (e.g., underwater)
  options: {
    id: string | number;
    value: any; // value to display (number, text)
    isCorrect?: boolean; // For choice games
    numericValue?: number; // For math calculation
    content?: string; // Text content like "5 + 3"
    style?: string; // Specific style override (e.g. color of fish)
  }[];
  hint?: string;
}

export enum GameState {
  MENU,
  PLAYING,
  WON,
  LOST
}

export interface DragItem {
  id: number;
  value: number;
}