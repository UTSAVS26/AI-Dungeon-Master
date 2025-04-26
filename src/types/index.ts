export type CharacterRace = 'Human' | 'Elf' | 'Dwarf' | 'Halfling' | 'Orc' | 'Gnome';
export type CharacterClass = 'Warrior' | 'Wizard' | 'Rogue' | 'Cleric' | 'Ranger' | 'Bard';
export type WorldTheme = 'Medieval' | 'Dark Fantasy' | 'High Magic' | 'Wilderness';

export interface Character {
  name: string;
  race: CharacterRace;
  class: CharacterClass;
  stats?: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  inventory: InventoryItem[];
}

export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'potion' | 'artifact' | 'misc';
  quantity: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
}

export interface GameState {
  character: Character | null;
  worldTheme: WorldTheme | null;
  storyLog: StoryEntry[];
  currentLocation: string;
  quests: Quest[];
  isSaved: boolean;
}

export interface StoryEntry {
  id: string;
  text: string;
  type: 'narration' | 'dialog' | 'combat' | 'player-action';
  timestamp: number;
  speaker?: string;
  imageSrc?: string;
}

export interface DiceRoll {
  type: 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';
  result: number;
  success?: boolean;
  threshold?: number;
}