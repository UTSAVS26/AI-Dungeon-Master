import React from 'react';
import { Dice1 as Dice, Scroll, Shield, Wand2 } from 'lucide-react';
import Button from './ui/Button';
import { useGame } from '../context/GameContext';
import { hasSavedGame, loadGame } from '../utils/helpers';

interface HomePageProps {
  onStartNewGame: () => void;
  onContinueGame: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onStartNewGame, onContinueGame }) => {
  const { dispatch } = useGame();
  const savedGameExists = hasSavedGame();

  const handleContinueGame = () => {
    const savedGame = loadGame();
    if (savedGame) {
      dispatch({ type: 'LOAD_GAME', payload: savedGame });
      onContinueGame();
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/3617500/pexels-photo-3617500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-bold text-amber-500 mb-6 tracking-wide font-serif">
            AI Dungeon Master
          </h1>
          <div className="flex justify-center gap-4 mb-6">
            <Dice className="text-amber-400 h-10 w-10" />
            <Scroll className="text-amber-400 h-10 w-10" />
            <Shield className="text-amber-400 h-10 w-10" />
            <Wand2 className="text-amber-400 h-10 w-10" />
          </div>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Embark on epic adventures guided by an AI Dungeon Master. 
            Create characters, explore magical realms, and forge your own legend.
          </p>
        </div>
        
        <div className="flex flex-col w-full max-w-md gap-4">
          <Button 
            onClick={onStartNewGame} 
            size="lg" 
            fullWidth 
            className="border-2 border-amber-600"
          >
            Start New Adventure
          </Button>
          
          {savedGameExists && (
            <Button 
              onClick={handleContinueGame} 
              variant="ghost" 
              size="lg" 
              fullWidth 
              className="text-amber-400 border-amber-400 hover:bg-amber-900/30"
            >
              Continue Adventure
            </Button>
          )}
          
          <div className="mt-8 text-gray-400 text-center text-sm">
            <p>Version 1.0 • © 2025 AI Dungeon Master</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;