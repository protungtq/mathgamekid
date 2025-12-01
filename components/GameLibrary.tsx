import React, { useState } from 'react';
import { MINI_GAMES } from '../constants';
import { MiniGameIdea } from '../types';
import MiniGamePlayer from './MiniGamePlayer';
import { Puzzle, Carrot, Map, Scale, Target, Hammer, Compass, Move, Grid, ShoppingCart, PlayCircle } from 'lucide-react';

interface GameLibraryProps {
  onBack: () => void;
}

const GameLibrary: React.FC<GameLibraryProps> = ({ onBack }) => {
  const [selectedGame, setSelectedGame] = useState<MiniGameIdea | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'puzzle': return <Puzzle className="text-purple-500" size={32} />;
      case 'carrot': return <Carrot className="text-orange-500" size={32} />;
      case 'map': return <Map className="text-blue-500" size={32} />;
      case 'scale': return <Scale className="text-green-500" size={32} />;
      case 'target': return <Target className="text-red-500" size={32} />;
      case 'hammer': return <Hammer className="text-yellow-600" size={32} />;
      case 'compass': return <Compass className="text-indigo-500" size={32} />;
      case 'move': return <Move className="text-pink-500" size={32} />;
      case 'grid': return <Grid className="text-teal-500" size={32} />;
      case 'shopping-cart': return <ShoppingCart className="text-yellow-500" size={32} />;
      default: return <Puzzle size={32} />;
    }
  };

  // If a game is selected, render the player instead of the list
  if (selectedGame) {
      return <MiniGamePlayer gameInfo={selectedGame} onBack={() => setSelectedGame(null)} />;
  }

  return (
    <div className="h-full flex flex-col p-6 overflow-hidden bg-kid-cream">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-black text-kid-blue drop-shadow-sm">Kho Tàng Trò Chơi</h2>
        <button onClick={onBack} className="bg-white px-4 py-2 rounded-full font-bold text-gray-600 shadow-md hover:bg-gray-50">
          Quay lại
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-20 custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MINI_GAMES.map((game) => (
            <div 
              key={game.id} 
              onClick={() => setSelectedGame(game)}
              className="bg-white rounded-3xl p-6 shadow-lg border-b-8 border-gray-200 cursor-pointer hover:border-kid-blue hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition transform group-hover:scale-125">
                 {getIcon(game.icon)}
              </div>
              
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-blue-50 transition shadow-inner">
                    {getIcon(game.icon)}
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-gray-800 group-hover:text-kid-blue leading-tight">{game.name}</h3>
                        <span className="inline-block bg-gray-100 text-gray-500 text-xs font-bold px-2 py-1 rounded-full mt-2 uppercase tracking-wide">
                            {game.category}
                        </span>
                    </div>
                </div>
                
                <p className="text-gray-500 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {game.rules}
                </p>

                <button className="w-full bg-kid-blue/10 text-kid-blue py-3 rounded-xl font-bold group-hover:bg-kid-blue group-hover:text-white transition flex items-center justify-center gap-2">
                    <PlayCircle size={20} />
                    Chơi Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameLibrary;