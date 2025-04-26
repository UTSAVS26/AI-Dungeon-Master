import React from 'react';
import { useGame } from '../context/GameContext';
import { X, Shield, Sword, FlaskRound as Flask, Gem, Package } from 'lucide-react';
import { InventoryItem } from '../types';

interface InventoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const InventoryPanel: React.FC<InventoryPanelProps> = ({ isOpen, onClose }) => {
  const { state } = useGame();
  const inventory = state.character?.inventory || [];

  const getItemIcon = (type: string) => {
    switch(type) {
      case 'weapon': return <Sword className="h-5 w-5 text-red-400" />;
      case 'armor': return <Shield className="h-5 w-5 text-blue-400" />;
      case 'potion': return <Flask className="h-5 w-5 text-green-400" />;
      case 'artifact': return <Gem className="h-5 w-5 text-purple-400" />;
      default: return <Package className="h-5 w-5 text-gray-400" />;
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-y-0 right-0 max-w-sm w-full bg-gray-900 shadow-lg border-l border-amber-800/50 z-40 transition-transform transform overflow-auto"
    >
      <div className="px-4 py-5 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-amber-500">Inventory</h2>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-4">
        {inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p>Your inventory is empty</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {inventory.map((item: InventoryItem) => (
              <li 
                key={item.id}
                className="bg-gray-800 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-start">
                  <div className="p-2 bg-gray-700 rounded mr-3">
                    {getItemIcon(item.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-medium text-white">{item.name}</h3>
                      {item.quantity > 1 && (
                        <span className="text-gray-400 text-sm">x{item.quantity}</span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InventoryPanel;