import React, { useState, useRef, useEffect } from 'react';
import { TowerLevel, GameState } from '../types';
import { generateTowerLevel, generateEncouragement } from '../services/geminiService';
import { RefreshCw, ArrowLeft, Trophy, AlertTriangle } from 'lucide-react';

interface TowerBuilderGameProps {
  onBack: () => void;
}

const TowerBuilderGame: React.FC<TowerBuilderGameProps> = ({ onBack }) => {
  const [level, setLevel] = useState<TowerLevel | null>(null);
  const [currentStack, setCurrentStack] = useState<number[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");
  const [isOverloaded, setIsOverloaded] = useState(false);
  
  // Dynamic scaling state
  const [blockHeight, setBlockHeight] = useState(40);
  const containerRef = useRef<HTMLDivElement>(null);

  const startGame = async (diff: 'easy' | 'medium' | 'hard') => {
    setLoading(true);
    setDifficulty(diff);
    setLevel(null);
    setMessage("Đang chuẩn bị gạch...");

    // Generate level
    const newLevel = await generateTowerLevel(diff);
    
    setLevel(newLevel);
    setAvailableBlocks([...newLevel.blocks]);
    setCurrentStack([]);
    setIsOverloaded(false);
    setGameState(GameState.PLAYING);
    setMessage("Bắt đầu xây nào!");
    setLoading(false);
  };

  // Calculate dynamic block height when level or container size changes
  useEffect(() => {
      if (gameState === GameState.PLAYING && level && containerRef.current) {
          const containerH = containerRef.current.clientHeight;
          const target = level.target;
          
          // Logic: We want the target height (Winning line) to be at roughly 75% of the screen height.
          // Formula: UnitHeight = (ContainerHeight * 0.75) / TargetValue
          // We clamp the value to ensure blocks aren't too tiny (<15px) or too huge (>60px)
          
          const calculatedHeight = (containerH * 0.75) / target;
          const clampedHeight = Math.min(Math.max(calculatedHeight, 15), 60);
          
          setBlockHeight(clampedHeight);
      }
  }, [gameState, level, containerRef.current?.clientHeight]);

  const calculateSum = (stack: number[]) => stack.reduce((a, b) => a + b, 0);

  const addToStack = (value: number, index: number) => {
    if (gameState !== GameState.PLAYING) return;
    
    const currentSum = calculateSum(currentStack);
    const target = level?.target || 0;
    const newSum = currentSum + value;

    if (newSum > target) {
        setIsOverloaded(true);
        setMessage("Cao quá rồi! Nguy hiểm!");
    }

    const newStack = [...currentStack, value];
    const newAvailable = [...availableBlocks];
    newAvailable.splice(index, 1);

    setCurrentStack(newStack);
    setAvailableBlocks(newAvailable);
    
    if (newSum === target) {
        handleWin();
    }
  };

  const removeFromStack = (index: number) => {
    if (gameState !== GameState.PLAYING) return;
    const valueToRemove = currentStack[index];
    const newStack = [...currentStack];
    newStack.splice(index, 1);
    
    setCurrentStack(newStack);
    setAvailableBlocks([...availableBlocks, valueToRemove]);
    
    const newSum = calculateSum(newStack);
    const target = level?.target || 0;

    if (newSum <= target) {
        setIsOverloaded(false);
        const remaining = target - newSum;
        setMessage(remaining === 0 ? "Chuẩn rồi!" : `Còn thiếu ${remaining} tầng.`);
    }
  };

  const handleWin = async () => {
      setGameState(GameState.WON);
      setIsOverloaded(false);
      const msg = await generateEncouragement(true);
      setMessage(msg);
  };

  // Render Menu
  if (gameState === GameState.MENU) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 bg-sky-100 relative overflow-hidden font-sans">
        <div className="absolute top-10 left-10 text-6xl opacity-50 animate-bounce delay-700">☁️</div>
        <div className="absolute top-20 right-20 text-6xl opacity-50 animate-bounce">☁️</div>
        
        <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-2xl text-center max-w-md w-full border-b-8 border-gray-200 z-10">
            <h2 className="text-4xl md:text-5xl font-black text-kid-orange mb-4 tracking-tight">Kỹ Sư Xây Tháp</h2>
            <p className="text-gray-500 mb-8 font-medium">Bé hãy chọn cấp độ để thử tài tính toán nhé!</p>
            
            <div className="space-y-4">
            <button onClick={() => startGame('easy')} className="w-full bg-kid-green text-white p-4 rounded-2xl text-xl font-black shadow-lg hover:scale-105 transition active:scale-95 flex items-center justify-center gap-3">
                <span>🌱</span> Dễ (Tổng đến 10)
            </button>
            <button onClick={() => startGame('medium')} className="w-full bg-kid-blue text-white p-4 rounded-2xl text-xl font-black shadow-lg hover:scale-105 transition active:scale-95 flex items-center justify-center gap-3">
                <span>🏗️</span> Vừa (Tổng đến 20)
            </button>
            <button onClick={() => startGame('hard')} className="w-full bg-kid-red text-white p-4 rounded-2xl text-xl font-black shadow-lg hover:scale-105 transition active:scale-95 flex items-center justify-center gap-3">
                <span>👑</span> Khó (Tổng đến 35)
            </button>
            </div>
            
            <button onClick={onBack} className="mt-8 text-gray-400 font-bold hover:text-gray-600">
            Quay lại
            </button>
        </div>
      </div>
    );
  }

  // Calculate visual metrics
  const targetPixels = (level?.target || 0) * blockHeight;
  const currentHeightPixels = calculateSum(currentStack) * blockHeight;

  return (
    <div className="flex flex-col h-full bg-sky-100 relative overflow-hidden select-none">
      {/* Background City - Fixed at bottom of screen */}
      <div className="absolute bottom-32 left-0 right-0 h-48 opacity-30 pointer-events-none" 
           style={{ 
               backgroundImage: 'url("https://www.svgrepo.com/show/490807/city-buildings.svg")', 
               backgroundRepeat: 'repeat-x',
               backgroundPosition: 'bottom',
               backgroundSize: 'contain'
            }}></div>

      {/* Header */}
      <div className="flex justify-between items-center p-3 bg-white/90 backdrop-blur shadow-sm z-30 shrink-0">
        <button onClick={() => setGameState(GameState.MENU)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div className="flex flex-col items-center">
             <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mục tiêu</div>
             <div className="text-3xl font-black text-kid-blue leading-none">{level?.target}</div>
        </div>
        <button onClick={() => startGame(difficulty)} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
          <RefreshCw size={24} className="text-gray-600" />
        </button>
      </div>

      {/* Main Game Container - No Scrolling */}
      <div className="flex-1 relative flex flex-col justify-end w-full max-w-lg mx-auto" ref={containerRef}>
        
        {/* Win Modal */}
        {gameState === GameState.WON && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[32px] p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-in zoom-in-95 duration-300">
              <Trophy className="mx-auto text-kid-yellow mb-4 drop-shadow-lg animate-bounce" size={80} />
              <h3 className="text-3xl font-black text-kid-green mb-2">Tuyệt Vời!</h3>
              <p className="text-gray-600 font-medium mb-8">{message}</p>
              <div className="grid grid-cols-2 gap-4">
                  <button onClick={onBack} className="py-3 rounded-xl bg-gray-100 font-bold text-gray-500 hover:bg-gray-200">Thoát</button>
                  <button onClick={() => startGame(difficulty)} className="py-3 rounded-xl bg-kid-blue font-bold text-white shadow-lg hover:bg-blue-600">Chơi tiếp</button>
              </div>
            </div>
          </div>
        )}

        {/* Message Toast */}
        <div className="absolute top-4 left-0 right-0 flex justify-center z-20 pointer-events-none">
            <div className={`px-6 py-2 rounded-full shadow-xl border-2 font-bold transition-all duration-300 transform flex items-center gap-2
                ${isOverloaded 
                    ? 'bg-red-500 border-red-600 text-white scale-110 animate-bounce' 
                    : 'bg-white border-white text-kid-blue'}
            `}>
                {isOverloaded && <AlertTriangle size={18} />}
                {message}
            </div>
        </div>

        {/* --- GAME BOARD (Absolute positioning relative to bottom ground) --- */}
        <div className="relative w-full h-full mb-28"> {/* mb-28 reserves space for footer */}
            
            {/* Ground */}
            <div className="absolute bottom-0 w-full h-4 bg-stone-700 border-t-4 border-stone-600 z-10"></div>
            
            {/* Target Line (Crane) */}
            <div 
                className="absolute w-full z-0 flex items-end justify-center transition-all duration-700 pointer-events-none"
                style={{ bottom: `${targetPixels}px` }}
            >
                {/* Dashed Line */}
                <div className={`w-full border-b-4 border-dashed absolute bottom-0 transition-colors ${isOverloaded ? 'border-red-500' : 'border-gray-400'}`}></div>
                
                {/* Crane Arm */}
                <div className="absolute -top-6 right-0 md:right-10 flex flex-col items-end opacity-90 origin-bottom-right transition-transform duration-700">
                     <div className="bg-kid-yellow h-3 w-40 md:w-56 border-2 border-black rounded-l-full relative shadow-xl flex items-center">
                         <span className="absolute left-4 font-black text-[10px] uppercase text-yellow-800 tracking-wider">Mục tiêu: {level?.target}</span>
                         <div className="absolute right-8 -bottom-6 h-6 w-1 bg-black"></div>
                         <div className="absolute right-5 -bottom-10 w-6 h-4 border-4 border-black rounded-b-lg border-t-0"></div>
                     </div>
                     <div className="bg-kid-yellow h-[800px] w-4 mr-2 border-2 border-black"></div>
                </div>
            </div>

            {/* The Tower Stack */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col-reverse items-center z-10 transition-transform duration-200" 
                 style={{ transform: isOverloaded ? 'translateX(2px)' : 'none' }}>
                {currentStack.map((val, idx) => (
                    <div 
                        key={`stack-${idx}`}
                        onClick={() => removeFromStack(idx)}
                        className="w-full flex justify-center cursor-pointer hover:brightness-110 active:scale-95 transition-all animate-in slide-in-from-top-10 duration-300 ease-out"
                        style={{ height: `${val * blockHeight}px` }}
                    >
                        {/* The Block */}
                        <div 
                            className={`
                                rounded-md shadow-lg border-x-2 border-y border-black/20
                                flex items-center justify-center relative overflow-hidden transition-all
                                ${isOverloaded && idx === currentStack.length - 1 ? 'bg-red-500 animate-pulse' : (idx % 2 === 0 ? 'bg-orange-500' : 'bg-yellow-500')}
                            `}
                            style={{ 
                                width: `${Math.min(180, Math.max(80, blockHeight * 3))}px` // Width scales slightly with height but stays reasonable
                            }}
                        >
                            {/* Texture */}
                            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/brick-wall.png')]"></div>
                            
                            {/* Number */}
                            {blockHeight > 20 && (
                                <span className="font-black text-white drop-shadow-md z-10" style={{ fontSize: `${blockHeight * 0.7}px` }}>
                                    {val}
                                </span>
                            )}
                            
                            {/* X indicator on hover */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/20 transition-opacity">
                                <span className="text-white font-bold text-xl">✕</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>

      {/* Footer / Control Panel (Fixed Height) */}
      <div className="h-28 bg-white/95 backdrop-blur-md px-2 py-2 rounded-t-[30px] border-t-4 border-kid-blue shadow-[0_-10px_40px_rgba(0,0,0,0.1)] z-40 shrink-0">
          <div className="flex justify-between items-center mb-1 px-4">
             <p className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">Kho gạch xây dựng</p>
             <p className="text-kid-blue text-xs font-bold">Cao: {calculateSum(currentStack)} / {level?.target}</p>
          </div>
          
          <div className="flex items-center justify-center gap-2 h-16 overflow-x-auto no-scrollbar">
            {availableBlocks.map((val, idx) => (
              <button
                key={`block-${idx}`}
                disabled={isOverloaded}
                onClick={() => addToStack(val, idx)}
                className={`
                    flex-shrink-0 w-12 h-14 bg-gradient-to-b from-kid-yellow to-yellow-500 
                    rounded-xl shadow-[0_4px_0_rgb(180,83,9)] active:shadow-none active:translate-y-[4px] 
                    transition-all border-2 border-yellow-600 flex flex-col items-center justify-center group
                    ${isOverloaded ? 'opacity-50 cursor-not-allowed grayscale' : ''}
                `}
              >
                 <span className="text-xl font-black text-white drop-shadow-sm group-hover:scale-110 transition-transform">{val}</span>
              </button>
            ))}
          </div>
      </div>

    </div>
  );
};

export default TowerBuilderGame;