import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Character, GameState, Quest, StoryEntry, WorldTheme } from '../types';
import { generateId } from '../utils/helpers';

const initialState: GameState = {
  character: null,
  worldTheme: null,
  storyLog: [],
  currentLocation: 'Unknown',
  quests: [],
  isSaved: false,
};

type GameAction =
  | { type: 'SET_CHARACTER'; payload: Character }
  | { type: 'SET_WORLD_THEME'; payload: WorldTheme }
  | { type: 'ADD_STORY_ENTRY'; payload: Omit<StoryEntry, 'id' | 'timestamp'> }
  | { type: 'SET_LOCATION'; payload: string }
  | { type: 'ADD_QUEST'; payload: Omit<Quest, 'id'> }
  | { type: 'UPDATE_QUEST'; payload: { id: string; updates: Partial<Quest> } }
  | { type: 'RESET_GAME' }
  | { type: 'LOAD_GAME'; payload: GameState }
  | { type: 'SET_SAVED'; payload: boolean }
  | { type: 'CLEAR_STORY' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_CHARACTER':
      return { ...state, character: action.payload, storyLog: [] };
    case 'SET_WORLD_THEME':
      return { ...state, worldTheme: action.payload };
    case 'ADD_STORY_ENTRY':
      const newEntry: StoryEntry = {
        id: generateId(),
        timestamp: Date.now(),
        ...action.payload,
      };
      return {
        ...state,
        storyLog: [...state.storyLog, newEntry],
        isSaved: false,
      };
    case 'SET_LOCATION':
      return { ...state, currentLocation: action.payload, isSaved: false };
    case 'ADD_QUEST':
      const newQuest: Quest = {
        id: generateId(),
        ...action.payload,
      };
      return {
        ...state,
        quests: [...state.quests, newQuest],
        isSaved: false,
      };
    case 'UPDATE_QUEST':
      return {
        ...state,
        quests: state.quests.map((quest) =>
          quest.id === action.payload.id
            ? { ...quest, ...action.payload.updates }
            : quest
        ),
        isSaved: false,
      };
    case 'RESET_GAME':
      return initialState;
    case 'LOAD_GAME':
      return action.payload;
    case 'SET_SAVED':
      return { ...state, isSaved: action.payload };
    case 'CLEAR_STORY':
      return { ...state, storyLog: [] };
    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}