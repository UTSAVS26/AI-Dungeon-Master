import React, { useState, useRef, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { StoryEntry } from '../types';
import { ArrowLeft, BookOpen, Dices, Package, Save, Send, Volume2, VolumeX } from 'lucide-react';
import Button from './ui/Button';
import DiceRoller from './DiceRoller';
import InventoryPanel from './InventoryPanel';
import QuestLog from './QuestLog';
import { getAIResponse, saveGame } from '../utils/helpers';

interface GameScreenProps {
  onSave: () => void;
  onBack: () => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onSave, onBack }) => {
  const { state, dispatch } = useGame();
  const [playerInput, setPlayerInput] = useState('');
  const [showDiceRoller, setShowDiceRoller] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [showQuestLog, setShowQuestLog] = useState(false);
  const [diceType, setDiceType] = useState<'d20' | 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd100'>('d20');
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const storyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (storyEndRef.current) {
      storyEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state.storyLog]);

  const handlePlayerAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerInput.trim()) return;

    dispatch({
      type: 'ADD_STORY_ENTRY',
      payload: {
        text: playerInput,
        type: 'player-action'
      }
    });

    const aiResponse = getAIResponse(playerInput, state.currentLocation);
    
    setTimeout(() => {
      dispatch({
        type: 'ADD_STORY_ENTRY',
        payload: {
          text: aiResponse,
          type: 'narration'
        }
      });
    }, 1000);

    setPlayerInput('');
  };

  const handleDiceRollComplete = (result: number, success: boolean) => {
    dispatch({
      type: 'ADD_STORY_ENTRY',
      payload: {
        text: `You rolled a ${result} on a ${diceType}. ${
          success ? 'Success!' : 'Failure!'
        }`,
        type: 'narration'
      }
    });
    
    if (success) {
      setTimeout(() => {
        dispatch({
          type: 'ADD_STORY_ENTRY',
          payload: {
            text: `Your skillful attempt pays off, granting you an advantage in the situation.`,
            type: 'narration'
          }
        });
      }, 1000);
    } else {
      setTimeout(() => {
        dispatch({
          type: 'ADD_STORY_ENTRY',
          payload: {
            text: `Your attempt fails, making the situation more challenging.`,
            type: 'narration'
          }
        });
      }, 1000);
    }
    
    setShowDiceRoller(false);
  };

  const handleSaveGame = () => {
    saveGame(state);
    dispatch({ type: 'SET_SAVED', payload: true });
    onSave();
  };

  const handleDiceClick = () => {
    const diceTypes: Array<'d4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'> = 
      ['d4', 'd6', 'd8', 'd10', 'd12', 'd20', 'd100'];
    
    const diceMenu = document.createElement('div');
    diceMenu.className = 'absolute bottom-full mb-2 bg-gray-900 border border-amber-800/50 rounded-lg p-2 flex flex-col gap-1';
    
    diceTypes.forEach(type => {
      const button = document.createElement('button');
      button.className = `px-4 py-2 text-left hover:bg-amber-900/30 rounded ${diceType === type ? 'bg-amber-900/50' : ''}`;
      button.textContent = type.toUpperCase();
      button.onclick = () => {
        setDiceType(type);
        setShowDiceRoller(true);
        diceMenu.remove();
      };
      diceMenu.appendChild(button);
    });
    
    const diceButton = document.querySelector('#dice-button');
    if (diceButton) {
      diceButton.appendChild(diceMenu);
      
      const handleClickOutside = (e: MouseEvent) => {
        if (!diceMenu.contains(e.target as Node)) {
          diceMenu.remove();
          document.removeEventListener('click', handleClickOutside);
        }
      };
      
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 0);
    }
  };

  const renderStoryEntry = (entry: StoryEntry) => {
    switch (entry.type) {
      case 'narration':
        return (
          <div key={entry.id} className="mb-6 bg-gray-900/80 p-4 rounded-lg shadow border border-gray-800">
            <p className="text-gray-300">{entry.text}</p>
            {entry.imageSrc && (
              <img 
                src={entry.imageSrc} 
                alt="Scene" 
                className="mt-3 rounded-md w-full max-h-64 object-cover"
              />
            )}
          </div>
        );
      case 'player-action':
        return (
          <div key={entry.id} className="mb-6 bg-amber-900/30 p-4 rounded-lg shadow border border-amber-800/50">
            <p className="text-amber-300">
              <span className="font-semibold">{state.character?.name}:</span> {entry.text}
            </p>
          </div>
        );
      case 'dialog':
        return (
          <div key={entry.id} className="mb-6 bg-gray-800/80 p-4 rounded-lg shadow border border-gray-700">
            <p className="text-white">
              <span className="font-semibold text-blue-400">{entry.speaker}:</span> "{entry.text}"
            </p>
          </div>
        );
      case 'combat':
        return (
          <div key={entry.id} className="mb-6 bg-red-900/30 p-4 rounded-lg shadow border border-red-800/50">
            <p className="text-red-300">{entry.text}</p>
          </div>
        );
      default:
        return (
          <div key={entry.id} className="mb-6 p-4">
            <p>{entry.text}</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" 
         style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(https://images.pexels.com/photos/1121123/pexels-photo-1121123.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-amber-800/30 sticky top-0 z-30">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-400 hover:text-amber-400"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-amber-500 text-xl font-bold">{state.character?.name}</h1>
              <p className="text-gray-400 text-sm">{state.character?.race} {state.character?.class}</p>
            </div>
          </div>
          
          <div className="text-gray-400 text-sm">
            <p>{state.currentLocation}</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className="text-gray-400 hover:text-amber-400 p-2"
              title={voiceEnabled ? "Disable voice" : "Enable voice"}
            >
              {voiceEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setShowInventory(true)}
              className="text-gray-400 hover:text-amber-400 p-2"
              title="Inventory"
            >
              <Package className="h-5 w-5" />
            </button>
            
            <button
              onClick={() => setShowQuestLog(true)}
              className="text-gray-400 hover:text-amber-400 p-2"
              title="Quest Log"
            >
              <BookOpen className="h-5 w-5" />
            </button>
            
            <button
              onClick={handleSaveGame}
              className="text-gray-400 hover:text-amber-400 p-2"
              title="Save Game"
            >
              <Save className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8 min-h-[calc(100vh-130px)]">
        <div className="max-w-4xl mx-auto">
          {state.storyLog.map(renderStoryEntry)}
          <div ref={storyEndRef} />
        </div>
      </main>
      
      <footer className="bg-gray-900/90 backdrop-blur-sm border-t border-amber-800/30 sticky bottom-0 z-30">
        <div className="container mx-auto px-4 py-3">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handlePlayerAction} className="flex gap-2">
              <div className="flex-grow">
                <input
                  type="text"
                  value={playerInput}
                  onChange={(e) => setPlayerInput(e.target.value)}
                  placeholder="What do you do next?"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  id="dice-button"
                  onClick={handleDiceClick}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-md"
                  title="Roll Dice"
                >
                  <Dices className="h-5 w-5" />
                </button>
              </div>
              
              <button
                type="submit"
                className="bg-amber-700 hover:bg-amber-800 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Send className="h-4 w-4" />
                <span>Act</span>
              </button>
            </form>
          </div>
        </div>
      </footer>
      
      <DiceRoller 
        diceType={diceType}
        threshold={10}
        onComplete={handleDiceRollComplete}
        isOpen={showDiceRoller}
        onClose={() => setShowDiceRoller(false)}
      />
      
      <InventoryPanel 
        isOpen={showInventory}
        onClose={() => setShowInventory(false)}
      />
      
      <QuestLog 
        isOpen={showQuestLog}
        onClose={() => setShowQuestLog(false)}
      />
    </div>
  );
};

export default GameScreen;