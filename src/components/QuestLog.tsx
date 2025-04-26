import React from 'react';
import { useGame } from '../context/GameContext';
import { X, BookOpen, CheckCircle } from 'lucide-react';
import { Quest } from '../types';

interface QuestLogProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuestLog: React.FC<QuestLogProps> = ({ isOpen, onClose }) => {
  const { state } = useGame();
  const quests = state.quests || [];
  
  const activeQuests = quests.filter(quest => quest.isActive && !quest.isCompleted);
  const completedQuests = quests.filter(quest => quest.isCompleted);
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 max-w-sm w-full bg-gray-900 shadow-lg border-l border-amber-800/50 z-40 transition-transform transform overflow-auto"
    >
      <div className="px-4 py-5 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-500">Quest Log</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-4">
        {quests.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <BookOpen className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>No quests in your log yet</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activeQuests.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Active Quests</h3>
                <ul className="space-y-3">
                  {activeQuests.map((quest: Quest) => (
                    <li 
                      key={quest.id}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    >
                      <h4 className="font-medium text-amber-400">{quest.title}</h4>
                      <p className="text-gray-300 text-sm mt-2">{quest.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {completedQuests.length > 0 && (
              <div>
                <h3 className="text-lg font-medium text-white mb-3 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  Completed Quests
                </h3>
                <ul className="space-y-3">
                  {completedQuests.map((quest: Quest) => (
                    <li 
                      key={quest.id}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700/50"
                    >
                      <h4 className="font-medium text-gray-400 line-through">{quest.title}</h4>
                      <p className="text-gray-500 text-sm mt-2">{quest.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestLog;