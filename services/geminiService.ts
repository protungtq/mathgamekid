import { GoogleGenAI } from "@google/genai";
import { TowerLevel, GenericGameLevel } from '../types';

// Safely access env vars using optional chaining to prevent runtime errors
const apiKey = import.meta.env?.VITE_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// --- TOWER BUILDER GENERATOR ---
export const generateTowerLevel = async (difficulty: 'easy' | 'medium' | 'hard'): Promise<TowerLevel> => {
  let min = 5, max = 10;
  if (difficulty === 'medium') { min = 11; max = 20; }
  if (difficulty === 'hard') { min = 21; max = 35; }

  const target = Math.floor(Math.random() * (max - min + 1)) + min;
  
  let remaining = target;
  const solutionBlocks: number[] = [];
  
  while (remaining > 0) {
      const maxBlockSize = difficulty === 'easy' ? 5 : (difficulty === 'medium' ? 8 : 10);
      let nextBlock = Math.floor(Math.random() * Math.min(remaining, maxBlockSize)) + 1;
      
      // Bias towards solvable chunks
      if (remaining > 1 && nextBlock === 1 && Math.random() > 0.3) {
          nextBlock = Math.min(remaining, 2); 
      }
      
      if (remaining - nextBlock === 0) {
          solutionBlocks.push(nextBlock);
          remaining = 0;
      } else {
          solutionBlocks.push(nextBlock);
          remaining -= nextBlock;
      }
  }

  const distractorsCount = difficulty === 'easy' ? 2 : 4;
  const blocks = [...solutionBlocks];
  for(let i=0; i<distractorsCount; i++) {
      const rand = Math.floor(Math.random() * 5) + 1;
      blocks.push(rand);
  }

  return {
    target,
    blocks: blocks.sort(() => Math.random() - 0.5)
  };
};

// --- MINI GAMES GENERATOR ---
export const generateMiniGameData = async (gameId: string, difficulty: string): Promise<GenericGameLevel> => {
    // Priority: Local logic for speed and reliability
    return generateLocalMiniGame(gameId, difficulty);
};

const generateLocalMiniGame = (gameId: string, diff: string): GenericGameLevel => {
    switch (gameId) {
        // --- GRADE 1 ---
        case 'drag_calc':
             return generateMathChoiceGame(10, 'sum', 'Kéo số vào ô trống: 5 + __ = 8'); // Simplified for choice engine currently
        case 'fish_catch':
            return generateFishGame();
        case 'gift_box':
            return generateMathChoiceGame(10, 'sub', 'Tìm đáp án để đóng hộp:');
        case 'color_match':
            return generateColorMatchGame();
        case 'farm_harvest':
            return generateCollectionGame(['🥕', '🍎', '🌽', '🍓'], 8, 'Thu hoạch');

        // --- GRADE 2 ---
        case 'path_finder':
            return generatePathFinderGame(20);
        case 'puzzle_sum':
            return generateMathChoiceGame(20, 'mul', 'Mảnh ghép nào đúng?'); // Multiplication intro
        case 'balance_scale':
            return generateBalanceGame(20);
        case 'bridge_builder':
             return generateCollectionGame(['🪵', '🪵', '🪨'], 10, 'Xây cầu dài', false, 'm', true);
        case 'bubble_pop':
             return generateMathChoiceGame(20, 'sum', 'Bắn bóng có tổng đúng!');

        // --- GRADE 3 ---
        case 'collect_upgrade':
             return generateCollectionGame(['💎', '🛡️', '⚔️'], 50, 'Mua trang bị', true, 'vàng');
        case 'treasure_hunt':
             return generateTreasureGame(50);
        case 'matrix_run':
             return generateSequenceGame(false, 'add');

        // --- GRADE 4 ---
        case 'ladder_climb':
             return generateSequenceGame(true, 'mul');
        case 'bridge_advanced':
             return generateCollectionGame(['🏗️', '🧱'], 100, 'Xây cầu lớn', false, 'm', true);

        // --- GRADE 5 ---
        case 'maze_calc':
             return generateEquationGame();

        default:
             return generateMathChoiceGame(10, 'sum');
    }
}

// --- SPECIFIC GAME LOGIC IMPLEMENTATIONS ---

const generateFishGame = (): GenericGameLevel => {
    const target = Math.floor(Math.random() * 10) + 5; // e.g., > 7
    const isGreater = Math.random() > 0.5;
    
    // Create options
    const options = [];
    // Correct fish (meets criteria)
    const correctVal = isGreater ? target + Math.floor(Math.random() * 5) + 1 : target - Math.floor(Math.random() * 3) - 1;
    options.push({ id: 'c', value: '🐟', numericValue: correctVal, content: `${correctVal}`, isCorrect: true, style: 'text-blue-500' });
    
    // Wrong fish
    for(let i=0; i<3; i++) {
        let val = isGreater ? target - Math.floor(Math.random() * 5) - 1 : target + Math.floor(Math.random() * 5) + 1;
        if (val < 0) val = 0;
        options.push({ id: `w${i}`, value: '🐠', numericValue: val, content: `${val}`, isCorrect: false, style: 'text-orange-500' });
    }

    return {
        question: `Bắt chú cá mang số ${isGreater ? 'LỚN HƠN' : 'NHỎ HƠN'} ${target} nhé!`,
        bgTheme: 'underwater',
        options: options.sort(() => Math.random() - 0.5)
    };
}

const generateColorMatchGame = (): GenericGameLevel => {
    const colors = [
        { name: 'Đỏ', class: 'bg-red-500' },
        { name: 'Xanh', class: 'bg-blue-500' },
        { name: 'Vàng', class: 'bg-yellow-400' },
        { name: 'Tím', class: 'bg-purple-500' }
    ];
    const chosenColor = colors[Math.floor(Math.random() * colors.length)];
    const val = Math.floor(Math.random() * 9) + 1;
    
    // Logic: "Select the RED ball with number 5"
    // Or Math: "Red ball = 5. Blue ball = 3. Calculate Red + Blue?" -> Too complex for UI.
    // Simple Logic: "Chọn bóng màu [MÀU] có số [SỐ]"
    
    return {
        question: `Chọn bóng màu ${chosenColor.name}!`,
        options: colors.map(c => ({
            id: c.name,
            value: '', 
            style: c.class,
            isCorrect: c.name === chosenColor.name
        })),
        hint: 'Màu sắc'
    };
}

const generateEquationGame = (): GenericGameLevel => {
    // 2x = 10 -> Find 5
    const x = Math.floor(Math.random() * 10) + 1;
    const multiplier = Math.floor(Math.random() * 5) + 2;
    const product = x * multiplier;
    
    return {
        question: `Tìm x biết: ${multiplier} * x = ${product}`,
        options: [
            { id: '1', value: x, isCorrect: true },
            { id: '2', value: x + 1, isCorrect: false },
            { id: '3', value: x - 1, isCorrect: false },
            { id: '4', value: x + 2, isCorrect: false }
        ].sort(() => Math.random() - 0.5)
    }
}

const generateCollectionGame = (emojis: string[], maxItemsInPool: number, actionVerb: string, hasPrice = false, unit = '', isBridge = false): GenericGameLevel => {
    const minTarget = 4;
    const maxTarget = Math.max(minTarget + 1, maxItemsInPool - 2); 
    const target = Math.floor(Math.random() * (maxTarget - minTarget)) + minTarget;
    
    let currentSum = 0;
    const options: any[] = [];
    
    while (currentSum < target) {
        let val = Math.floor(Math.random() * (target - currentSum)) + 1;
        if (currentSum + val > target) val = target - currentSum;
        
        let display = "";
        const baseEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        if (isBridge) {
            const bars = "=".repeat(val);
            display = `[${bars} ${val}${unit} ${bars}]`;
        } else if (hasPrice) {
            display = `${baseEmoji} ${val}${unit}`;
        } else {
            display = Array(val).fill(baseEmoji).join('');
        }
        
        options.push({
            id: Math.random().toString(),
            value: display,
            numericValue: val,
            isCorrect: true 
        });
        currentSum += val;
    }

    // Add distractors
    for (let i = 0; i < 3; i++) {
        const val = Math.floor(Math.random() * 5) + 1;
        const baseEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        let display = "";
        if (isBridge) {
             const bars = "=".repeat(val);
             display = `[${bars} ${val}${unit} ${bars}]`;
        } else if (hasPrice) {
            display = `${baseEmoji} ${val}${unit}`;
        } else {
            display = Array(val).fill(baseEmoji).join('');
        }
        options.push({
            id: Math.random().toString(),
            value: display,
            numericValue: val,
            isCorrect: false
        });
    }

    return {
        question: `${actionVerb} đủ ${target}${unit} nhé!`,
        target: target,
        options: options.sort(() => Math.random() - 0.5)
    };
}

const generateMathChoiceGame = (range: number, type: 'sum' | 'sub' | 'mul', customPrompt?: string): GenericGameLevel => {
    const a = Math.floor(Math.random() * range) + 1;
    const b = Math.floor(Math.random() * range) + 1;
    
    let question = "";
    let ans = 0;
    
    if (type === 'sum') {
        question = `${a} + ${b} = ?`;
        ans = a + b;
    } else if (type === 'sub') {
        const max = Math.max(a, b);
        const min = Math.min(a, b);
        question = `${max} - ${min} = ?`;
        ans = max - min;
    } else {
        const ma = Math.floor(Math.random() * 9) + 1;
        const mb = Math.floor(Math.random() * 5) + 1;
        question = `${ma} x ${mb} = ?`;
        ans = ma * mb;
    }

    const opts = new Set([ans]);
    while (opts.size < 4) {
        const offset = Math.floor(Math.random() * 5) - 2;
        const wrong = ans + offset;
        if (wrong >= 0 && wrong !== ans) opts.add(wrong);
    }

    return {
        question: customPrompt ? `${customPrompt} ${question}` : `Kết quả: ${question}`,
        options: Array.from(opts).map(val => ({
            id: val.toString(),
            value: val,
            isCorrect: val === ans
        })).sort(() => Math.random() - 0.5)
    };
}

const generatePathFinderGame = (range: number): GenericGameLevel => {
    const target = Math.floor(Math.random() * range) + 5;
    const a = Math.floor(Math.random() * (target - 1)) + 1;
    const b = target - a;
    const correctEq = `${a} + ${b}`;
    const wrongEqs = [];
    while (wrongEqs.length < 3) {
        const wa = Math.floor(Math.random() * range) + 1;
        const wb = Math.floor(Math.random() * range) + 1;
        if ((wa + wb) !== target) wrongEqs.push(`${wa} + ${wb}`);
    }
    return {
        question: `Đi theo hướng có kết quả bằng ${target}!`,
        options: [
            { id: 'c1', value: correctEq, isCorrect: true },
            { id: 'w1', value: wrongEqs[0], isCorrect: false },
            { id: 'w2', value: wrongEqs[1], isCorrect: false },
            { id: 'w3', value: wrongEqs[2], isCorrect: false },
        ].sort(() => Math.random() - 0.5)
    };
}

const generateTreasureGame = (range: number): GenericGameLevel => {
    const a = Math.floor(Math.random() * range) + 1;
    const b = Math.floor(Math.random() * range) + 1;
    if (a === b) return generateTreasureGame(range);
    return {
        question: `Bên nào lớn hơn: ${a} hay ${b}?`,
        options: [
            { id: '1', value: a, isCorrect: a > b },
            { id: '2', value: b, isCorrect: b > a }
        ]
    };
}

const generateBalanceGame = (targetWeight: number): GenericGameLevel => {
     const current = Math.floor(Math.random() * (targetWeight - 1)) + 1;
     const needed = targetWeight - current;
     return {
         question: `Cân lệch! Bên trái ${targetWeight}kg, phải ${current}kg. Thêm bao nhiêu?`,
         options: [
             { id: '1', value: `${needed}kg`, isCorrect: true },
             { id: '2', value: `${needed + 2}kg`, isCorrect: false },
             { id: '3', value: `${Math.max(1, needed - 1)}kg`, isCorrect: false },
             { id: '4', value: `${needed + 5}kg`, isCorrect: false }
         ].sort(() => Math.random() - 0.5)
     }
}

const generateSequenceGame = (isHard: boolean, type: 'add'|'multiply'|'mul' = 'add'): GenericGameLevel => {
    const start = Math.floor(Math.random() * 5) + 1;
    const step = Math.floor(Math.random() * 3) + 2; 
    let seq: number[] = [];
    let next = 0;

    if (type === 'add') {
        seq = [start, start + step, start + step * 2];
        next = start + step * 3;
    } else {
        seq = [step, step * 2, step * 3];
        next = step * 4;
    }
    
    return {
        question: `Điền số tiếp theo: ${seq.join(', ')}, ...`,
        options: [
            { id: '1', value: next, isCorrect: true },
            { id: '2', value: next + 1, isCorrect: false },
            { id: '3', value: next - step, isCorrect: false },
            { id: '4', value: next + step * 2, isCorrect: false }
        ].sort(() => Math.random() - 0.5)
    }
}

export const generateEncouragement = async (isWin: boolean): Promise<string> => {
   const wins = ["Tuyệt vời!", "Bé giỏi quá!", "Xuất sắc!", "Hoan hô!", "Đúng rồi!", "Thông minh quá!", "Bingo!"];
   return wins[Math.floor(Math.random() * wins.length)];
};