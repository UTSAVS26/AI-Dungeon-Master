import React, { useState, useEffect } from 'react';
import { Check, X } from 'lucide-react';
import { rollDice } from '../utils/helpers';

interface DiceRollerProps {
  diceType: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
  threshold?: number;
  onComplete: (result: number, success: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
}

const DiceRoller: React.FC<DiceRollerProps> = ({
  diceType,
  threshold,
  onComplete,
  isOpen,
  onClose,
}) => {
  const [result, setResult] = useState<number | null>(null);
  const [rolling, setRolling] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [animation, setAnimation] = useState('');

  useEffect(() => {
    if (isOpen) {
      handleRoll();
    } else {
      setResult(null);
      setSuccess(null);
    }
  }, [isOpen]);

  const handleRoll = () => {
    setRolling(true);
    setAnimation('animate-spin');
    
    // Simulate rolling animation
    setTimeout(() => {
      const rollResult = rollDice(diceType);
      setResult(rollResult);
      setRolling(false);
      setAnimation('animate-bounce');
      
      if (threshold) {
        const isSuccess = rollResult >= threshold;
        setSuccess(isSuccess);
        onComplete(rollResult, isSuccess);
      } else {
        onComplete(rollResult, true);
      }
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-amber-800/50 rounded-xl p-6 max-w-md w-full text-center">
        <h3 className="text-2xl font-bold text-amber-500 mb-6">
          Rolling {diceType.toUpperCase()}
          {threshold ? ` (Need ${threshold}+)` : ''}
        </h3>
        
        <div className="flex justify-center my-8">
          <div 
            className={`w-24 h-24 bg-amber-700 text-white rounded-xl font-bold text-4xl flex items-center justify-center ${animation}`}
          >
            {rolling ? '?' : result}
          </div>
        </div>
        
        {!rolling && result !== null && (
          <div className="mb-6">
            {threshold ? (
              <div className="flex items-center justify-center space-x-2">
                <span className="text-xl">
                  {success ? 'Success!' : 'Failed!'}
                </span>
                {success ? (
                  <Check className="text-green-500 w-6 h-6" />
                ) : (
                  <X className="text-red-500 w-6 h-6" />
                )}
              </div>
            ) : (
              <p className="text-xl text-white">You rolled a {result}!</p>
            )}
          </div>
        )}
        
        <div className="flex justify-center mt-4">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-md transition-colors"
            disabled={rolling}
          >
            {rolling ? 'Rolling...' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiceRoller;