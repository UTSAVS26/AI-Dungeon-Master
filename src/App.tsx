import React, { useState } from 'react';
import HomePage from './components/HomePage';
import CharacterSetup from './components/CharacterSetup';
import GameScreen from './components/GameScreen';
import { GameProvider } from './context/GameContext';

function App() {
  const [gameState, setGameState] = useState<'home' | 'setup' | 'playing'>('home');
  const [savedNotification, setSavedNotification] = useState(false);

  const handleSaveComplete = () => {
    setSavedNotification(true);
    setTimeout(() => {
      setSavedNotification(false);
    }, 3000);
  };

  return (
    <GameProvider>
      <div className="font-serif">
        {gameState === 'home' && (
          <HomePage 
            onStartNewGame={() => setGameState('setup')}
            onContinueGame={() => setGameState('playing')}
          />
        )}
        
        {gameState === 'setup' && (
          <CharacterSetup 
            onComplete={() => setGameState('playing')}
            onBack={() => setGameState('home')}
          />
        )}
        
        {gameState === 'playing' && (
          <GameScreen 
            onSave={handleSaveComplete}
            onBack={() => setGameState('home')}
          />
        )}
        
        {savedNotification && (
          <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-4 py-2 rounded-md shadow-lg z-50 animate-fade-in-out">
            Game saved successfully!
          </div>
        )}
      </div>
    </GameProvider>
  );
}

export default App;