// Generate a unique ID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};

// Mock AI response - In a real app, this would be replaced with actual API calls
export const getAIResponse = (
  playerAction: string, 
  currentLocation: string
): string => {
  // Basic responses for demo purposes
  const responses = [
    `As you ${playerAction}, you notice a strange glow emanating from behind a nearby tree.`,
    `The innkeeper glances at you suspiciously as you ${playerAction}.`,
    `A cold wind blows through ${currentLocation} as you ${playerAction}.`,
    `The ground trembles slightly beneath your feet as you ${playerAction}.`,
    `A distant howl echoes through ${currentLocation} just as you ${playerAction}.`,
    `"Be careful," whispers a hooded figure passing by as you ${playerAction}.`,
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Roll dice helper
export const rollDice = (
  diceType: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100'
): number => {
  const diceValues = {
    'd4': 4,
    'd6': 6,
    'd8': 8,
    'd10': 10,
    'd12': 12,
    'd20': 20,
    'd100': 100
  };
  
  return Math.floor(Math.random() * diceValues[diceType]) + 1;
};

// Save game to localStorage
export const saveGame = (gameState: any): void => {
  localStorage.setItem('aiDungeonMasterSave', JSON.stringify(gameState));
};

// Load game from localStorage
export const loadGame = (): any | null => {
  const savedGame = localStorage.getItem('aiDungeonMasterSave');
  return savedGame ? JSON.parse(savedGame) : null;
};

// Check if a saved game exists
export const hasSavedGame = (): boolean => {
  return localStorage.getItem('aiDungeonMasterSave') !== null;
};