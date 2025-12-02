import React, { useState, useEffect } from 'react';
import { MiniGameIdea, GenericGameLevel, GameState } from '../types';
import { generateMiniGameData, generateEncouragement } from '../services/geminiService';
import { ArrowLeft, RefreshCw, CheckCircle, Trophy, Home, DoorOpen, Gift } from 'lucide-react';

interface MiniGamePlayerProps {
  gameInfo: MiniGameIdea;
  onBack: () => void;
}

const MiniGamePlayer: React.FC<MiniGamePlayerProps> = ({ gameInfo, onBack }) => {
  const [level, setLevel] = useState<GenericGameLevel | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [gameState, setGameState] = useState<GameState>(GameState.MENU);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState(0);

  const startLevel = async () => {
    setLoading(true);
    setGameState(GameState.PLAYING);
    setSelectedOptions([]);
    setMessage("");
    
    const diff = streak > 3 ? 'medium' : 'easy';
    const data = await generateMiniGameData(gameInfo.id, diff);
    
    setLevel(data);
    setLoading(false);
  };

  useEffect(() => {
    startLevel();
  }, [gameInfo.id]);

  const handleNextLevel = () => {
      setStreak(s => s + 1);
      startLevel();
  };

  const handleOptionClick = async (option: any) => {
    if (gameState !== GameState.PLAYING) return;

    if (gameInfo.type === 'choice' || gameInfo.type === 'sequence' || gameInfo.type === 'comparison' || gameInfo.type === 'drag_match') {
        if (option.isCorrect) {
            setGameState(GameState.WON);
            setMessage(await generateEncouragement(true));
        } else {
            setMessage("Chưa đúng rồi, thử đáp án khác nhé!");
        }
    } 
    else {
        let newSelection = [...selectedOptions];
        if (newSelection.includes(option.id)) {
            newSelection = newSelection.filter(id => id !== option.id);
        } else {
            newSelection.push(option.id);
        }
        setSelectedOptions(newSelection);

        const currentSum = newSelection.reduce((acc, id) => {
            const item = level?.options.find(o => o.id === id);
            return acc + (item?.numericValue || 0);
        }, 0);
        const target = level?.target || 0;

        if (currentSum === target) {
            setGameState(GameState.WON);
            setMessage(await generateEncouragement(true));
        } else if (currentSum > target) {
             setMessage(`Vượt quá rồi! Đang có ${currentSum}/${target}.`);
        } else {
             const remaining = target - currentSum;
             setMessage(`Đang có ${currentSum}. Còn thiếu ${remaining} nữa.`);
        }
    }
  };

  const isEmoji = (str: string) => /\p{Emoji}/u.test(str);

  const getButtonVisuals = (option: any) => {
      const isSelected = selectedOptions.includes(option.id);
      
      if (gameInfo.id === 'fish_catch') {
          return {
              containerClass: `relative rounded-full aspect-square flex flex-col items-center justify-center shadow-lg transform transition-all hover:scale-110 
                  ${isSelected ? 'bg-green-100 ring-4 ring-green-400' : 'bg-blue-100 ring-4 ring-blue-200'}`,
              content: (
                  <>
                      <div className={`text-5xl mb-1 ${option.style || ''}`}>{option.value}</div>
                      <div className="bg-white/50 rounded-full px-3 py-1 text-2xl font-black text-blue-800 shadow-sm">{option.content}</div>
                  </>
              )
          }
      }

      if (gameInfo.id === 'gift_box') {
          return {
              containerClass: `relative rounded-3xl aspect-square flex flex-col items-center justify-center shadow-[0_10px_0_rgb(0,0,0,0.1)] border-4 border-pink-300 transform transition-all active:translate-y-2 active:shadow-none
                  ${isSelected ? 'bg-pink-200' : 'bg-pink-50'}`,
              content: (
                  <>
                      <Gift className="text-pink-500 mb-2 w-16 h-16 drop-shadow-sm"/>
                      <div className="text-3xl font-black text-pink-600">{option.value}</div>
                  </>
              )
          }
      }

      if (gameInfo.id === 'color_match') {
          return {
              containerClass: `relative rounded-full aspect-square flex items-center justify-center shadow-lg border-4 border-white transform transition-transform hover:scale-105 ${option.style}`,
              content: <div className="text-white font-black text-3xl drop-shadow-md">{option.value || '?'}</div>
          }
      }

      if (gameInfo.id === 'ladder_climb') {
          return {
              containerClass: "w-full bg-amber-100 border-y-8 border-amber-800 h-20 flex items-center justify-center shadow-md relative my-2 hover:bg-amber-200",
              content: <div className="text-4xl font-black text-amber-900">{option.value}</div>
          }
      }

      if (gameInfo.id.includes('bridge')) {
          const widthClass = option.numericValue >= 8 ? 'w-full' : (option.numericValue >= 5 ? 'w-3/4' : 'w-1/2');
          return {
              containerClass: `bg-amber-700/90 border-b-4 border-amber-900 rounded-lg shadow-xl p-0 flex items-center justify-center h-20 mx-auto ${widthClass} ${isSelected ? 'brightness-125' : ''}`,
              content: <div className="text-white font-mono text-lg font-bold tracking-widest">{option.value}</div>
          };
      }
      
      if (gameInfo.id === 'puzzle_sum') {
          return {
              containerClass: "bg-purple-100 border-2 border-purple-300 rounded-xl shadow-md relative overflow-hidden aspect-square flex items-center justify-center hover:bg-purple-200",
              content: <div className="text-4xl font-black text-purple-600">{option.value}</div>
          };
      }

      if (gameInfo.id.includes('path') || gameInfo.id.includes('maze')) {
          return {
              containerClass: "bg-blue-600 border-x-4 border-t-4 border-blue-800 rounded-t-full shadow-lg aspect-[3/4] flex flex-col items-center justify-end pb-4 hover:bg-blue-500",
              content: (
                  <>
                    <DoorOpen size={40} className="text-blue-200 mb-2"/>
                    <div className="text-2xl font-black text-white bg-black/20 px-3 py-1 rounded">{option.value}</div>
                  </>
              )
          }
      }

      return {
          containerClass: `bg-white border-b-[6px] border-gray-200 rounded-3xl shadow-lg p-2 min-h-[120px] flex items-center justify-center ${isSelected ? 'ring-4 ring-green-400 bg-green-50' : ''}`,
          content: <div className={isEmoji(String(option.value)) ? 'text-5xl' : 'text-3xl font-black text-gray-700'}>{option.value}</div>
      };
  };

  const getBackground = () => {
      if (level?.bgTheme === 'underwater') return "bg-gradient-to-b from-cyan-200 to-blue-500";
      return "bg-gradient-to-b from-blue-50 to-white";
  }

  if (loading) {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-kid-cream">
            <div className="w-16 h-16 border-4 border-kid-blue border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-500 font-bold animate-pulse">Đang tải màn chơi...</p>
        </div>
    );
  }

  return (
    <div className={`flex flex-col h-full ${getBackground()} relative overflow-hidden font-sans`}>
      
      {level?.bgTheme === 'underwater' && (
          <>
            <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce delay-1000">🫧</div>
            <div className="absolute bottom-20 right-10 text-6xl opacity-20 animate-bounce">🫧</div>
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl"></div>
          </>
      )}

      <div className="flex items-center justify-between p-4 bg-white/80 backdrop-blur-md shadow-sm z-10 sticky top-0">
        <button onClick={onBack} className="p-3 hover:bg-gray-100 rounded-full transition bg-white shadow-sm border border-gray-100">
            <ArrowLeft className="text-gray-600" size={24}/>
        </button>
        <div className="flex flex-col items-center">
            <h2 className="font-black text-lg md:text-xl text-kid-blue uppercase tracking-wide drop-shadow-sm">{gameInfo.name}</h2>
            <div className="flex gap-1 h-4 items-center">
                {streak > 0 && <span className="text-xs font-bold text-orange-400 mr-1">Chuỗi: {streak}</span>}
                {[...Array(Math.min(streak, 5))].map((_, i) => <span key={i} className="text-yellow-400 text-xs">⭐</span>)}
            </div>
        </div>
        <button onClick={startLevel} className="p-3 hover:bg-gray-100 rounded-full transition bg-white shadow-sm border border-gray-100">
            <RefreshCw className="text-gray-600" size={24}/>
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center p-4 md:p-8 overflow-y-auto w-full custom-scrollbar">
        <div className="w-full max-w-2xl bg-white rounded-[32px] p-6 md:p-8 shadow-xl mb-6 text-center border-b-[6px] border-kid-purple relative z-10">
             <h3 className="text-xl md:text-3xl font-bold text-gray-700 mb-4 leading-relaxed">{level?.question}</h3>
             
             {gameInfo.type === 'collection' && level?.target && (
                 <div className="inline-flex flex-col items-center bg-orange-50 px-6 py-2 rounded-2xl border-2 border-orange-100">
                     <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Mục tiêu</span>
                     <span className="text-4xl md:text-5xl font-black text-kid-orange drop-shadow-sm">{level?.target}</span>
                 </div>
             )}

             {level?.hint && <div className="mt-2 text-sm text-gray-400 italic">Gợi ý: {level.hint}</div>}
             
             {message && gameState !== GameState.WON && (
                 <div className="mt-4 text-kid-blue font-bold animate-pulse bg-blue-50 py-2 px-4 rounded-xl inline-block">
                     {message}
                 </div>
             )}
        </div>

        <div className={`
            grid gap-4 w-full max-w-2xl pb-24
            ${gameInfo.id === 'bridge_builder' || gameInfo.id === 'ladder_climb' ? 'grid-cols-1' : (level?.options.length === 2 ? 'grid-cols-2' : 'grid-cols-2 md:grid-cols-3')}
        `}>
            {level?.options.map((opt, idx) => {
                const visuals = getButtonVisuals(opt);
                return (
                    <button 
                        key={idx}
                        disabled={gameState === GameState.WON}
                        onClick={() => handleOptionClick(opt)}
                        className={`
                            ${visuals.containerClass}
                            relative group
                        `}
                    >
                        {visuals.content}
                        
                        {selectedOptions.includes(String(opt.id)) && gameInfo.type === 'collection' && (
                           <div className="absolute top-2 right-2 z-10 text-kid-green bg-white rounded-full shadow-sm p-1"><CheckCircle size={20} fill="currentColor"/></div>
                        )}
                    </button>
                )
            })}
        </div>
      </div>

      {gameState === GameState.WON && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-[40px] p-8 max-w-sm w-full text-center shadow-2xl transform scale-100 animate-in zoom-in-95 duration-300 border-4 border-white">
              <Trophy className="mx-auto text-yellow-400 mb-4 drop-shadow-lg animate-bounce" size={80} fill="currentColor" />
              <h3 className="text-3xl font-black text-kid-green mb-2">{message}</h3>
              <p className="text-gray-500 font-bold mb-8">Bé làm tốt lắm!</p>
              
              <div className="flex flex-col gap-3">
                  <button onClick={handleNextLevel} className="w-full py-4 rounded-2xl bg-kid-blue font-black text-white text-xl shadow-lg shadow-blue-200 hover:bg-blue-600 hover:scale-105 transition-all flex items-center justify-center gap-2">
                      <RefreshCw size={24} /> Màn Tiếp Theo
                  </button>
                  <button onClick={onBack} className="w-full py-3 rounded-2xl bg-gray-100 font-bold text-gray-500 hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
                      <Home size={20} /> Quay lại trang chủ
                  </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default MiniGamePlayer;