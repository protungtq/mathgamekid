import React, { useState } from 'react';
import TowerBuilderGame from './components/TowerBuilderGame';
import MiniGamePlayer from './components/MiniGamePlayer';
import { MINI_GAMES } from './constants';
import { MiniGameIdea } from './types';
import { Play, Star, Puzzle, Carrot, Map, Scale, Target, Hammer, Compass, Move, Grid, ShoppingCart, Zap, Fish, Gift, Palette, AlignJustify, Activity } from 'lucide-react';

enum View {
  HOME,
  TOWER_GAME,
  MINI_GAME
}

export default function App() {
  const [currentView, setCurrentView] = useState<View>(View.HOME);
  const [selectedMiniGame, setSelectedMiniGame] = useState<MiniGameIdea | null>(null);
  const [activeGrade, setActiveGrade] = useState<number>(1);

  const handlePlayTower = () => {
    setCurrentView(View.TOWER_GAME);
  };

  const handlePlayMiniGame = (game: MiniGameIdea) => {
    if (game.id === 'tower_builder') {
        handlePlayTower();
    } else {
        setSelectedMiniGame(game);
        setCurrentView(View.MINI_GAME);
    }
  };

  const goHome = () => {
    setCurrentView(View.HOME);
    setSelectedMiniGame(null);
  };

  const getIcon = (iconName: string) => {
    const props = { size: 32, className: "text-white drop-shadow-md" };
    switch (iconName) {
      case 'fish': return <Fish {...props} />;
      case 'gift': return <Gift {...props} />;
      case 'palette': return <Palette {...props} />;
      case 'castle': return <div className="text-4xl">🏰</div>;
      case 'puzzle': return <Puzzle {...props} />;
      case 'carrot': return <Carrot {...props} />;
      case 'map': return <Map {...props} />;
      case 'scale': return <Scale {...props} />;
      case 'target': return <Target {...props} />;
      case 'hammer': return <Hammer {...props} />;
      case 'compass': return <Compass {...props} />;
      case 'move': return <Move {...props} />;
      case 'grid': return <Grid {...props} />;
      case 'shopping-cart': return <ShoppingCart {...props} />;
      case 'align-justify': return <AlignJustify {...props} />;
      case 'activity': return <Activity {...props} />;
      default: return <Star {...props} />;
    }
  };

  const getGradeColor = (grade: number) => {
      switch(grade) {
          case 1: return { bg: 'bg-green-500', text: 'text-green-600', border: 'border-green-600', soft: 'bg-green-100' };
          case 2: return { bg: 'bg-yellow-400', text: 'text-yellow-600', border: 'border-yellow-600', soft: 'bg-yellow-100' };
          case 3: return { bg: 'bg-orange-500', text: 'text-orange-600', border: 'border-orange-600', soft: 'bg-orange-100' };
          case 4: return { bg: 'bg-blue-500', text: 'text-blue-600', border: 'border-blue-600', soft: 'bg-blue-100' };
          case 5: return { bg: 'bg-purple-500', text: 'text-purple-600', border: 'border-purple-600', soft: 'bg-purple-100' };
          default: return { bg: 'bg-gray-500', text: 'text-gray-600', border: 'border-gray-600', soft: 'bg-gray-100' };
      }
  }

  const renderContent = () => {
    if (currentView === View.TOWER_GAME) {
      return <TowerBuilderGame onBack={goHome} />;
    }

    if (currentView === View.MINI_GAME && selectedMiniGame) {
      return <MiniGamePlayer gameInfo={selectedMiniGame} onBack={goHome} />;
    }

    const theme = getGradeColor(activeGrade);
    const filteredGames = MINI_GAMES.filter(g => g.grade === activeGrade);

    return (
      <div className="flex flex-col h-full overflow-y-auto custom-scrollbar bg-kid-cream">
        <div className="relative pt-8 pb-16 px-4 bg-white rounded-b-[40px] shadow-sm mb-6">
            <div className="text-center">
                <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 font-sans tracking-tight">
                    MathKingdom
                </h1>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Học mà chơi - Chơi mà học</p>
            </div>
            
            <div className="flex justify-center gap-2 mt-8 flex-wrap">
                {[1, 2, 3, 4, 5].map((grade) => {
                    const isActive = activeGrade === grade;
                    const colors = getGradeColor(grade);
                    return (
                        <button
                            key={grade}
                            onClick={() => setActiveGrade(grade)}
                            className={`
                                px-4 py-2 md:px-6 md:py-3 rounded-2xl font-black text-sm md:text-lg transition-all transform duration-200 border-b-4
                                ${isActive ? `${colors.bg} text-white ${colors.border} scale-110 shadow-lg` : 'bg-white text-gray-400 border-gray-200 hover:bg-gray-50'}
                            `}
                        >
                            Lớp {grade}
                        </button>
                    )
                })}
            </div>
        </div>

        <div className="w-full max-w-6xl mx-auto px-4 pb-20">
            <div className={`mb-6 flex items-center gap-3 ${theme.text}`}>
                <div className={`p-2 rounded-xl ${theme.bg} text-white`}><Zap fill="currentColor"/></div>
                <h3 className="text-2xl font-black">Thử Thách Lớp {activeGrade}</h3>
            </div>
            
            {filteredGames.length === 0 ? (
                <div className="text-center text-gray-400 font-bold py-10">Đang cập nhật bài học mới...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredGames.map((game) => (
                        <div 
                            key={game.id}
                            onClick={() => handlePlayMiniGame(game)}
                            className={`group relative overflow-hidden rounded-[32px] bg-white shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-b-[8px] border-gray-100 hover:border-${theme.border.split('-')[1]}-200`}
                        >
                            <div className={`h-28 ${theme.bg} relative flex items-center justify-center overflow-hidden`}>
                                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                                <div className="absolute top-0 -left-10 w-20 h-full bg-white/20 skew-x-12 blur-md animate-[shimmer_3s_infinite]"></div>
                                
                                <div className="transform group-hover:scale-125 transition-transform duration-300 group-hover:rotate-6">
                                    {getIcon(game.icon)}
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h4 className="text-xl font-black text-gray-800 mb-2 group-hover:text-kid-blue transition-colors line-clamp-1">
                                    {game.name}
                                </h4>
                                <div className="flex gap-2 mb-3">
                                    <span className="bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-md uppercase">
                                        {game.category}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed font-medium">
                                    {game.rules}
                                </p>
                            </div>

                            <button className={`absolute bottom-4 right-4 p-2 rounded-full ${theme.soft} ${theme.text} opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200`}>
                                <Play size={20} fill="currentColor" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-kid-cream font-sans selection:bg-kid-yellow selection:text-black overflow-hidden">
      {renderContent()}
    </div>
  );
}