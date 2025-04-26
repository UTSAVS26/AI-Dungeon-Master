import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import Button from './ui/Button';
import { Character, CharacterClass, CharacterRace, WorldTheme } from '../types';
import { BookOpen, Dices, HelpCircle, Sparkles, Swords, User, ArrowLeft } from 'lucide-react';

interface CharacterSetupProps {
  onComplete: () => void;
  onBack: () => void;
}

const CharacterSetup: React.FC<CharacterSetupProps> = ({ onComplete, onBack }) => {
  const { dispatch } = useGame();
  const [step, setStep] = useState<'character' | 'world'>('character');
  const [character, setCharacter] = useState<Partial<Character>>({
    name: '',
    race: 'Human',
    class: 'Warrior',
    inventory: []
  });
  const [worldTheme, setWorldTheme] = useState<WorldTheme>('Medieval');

  // Clear story log when component mounts
  useEffect(() => {
    dispatch({ type: 'CLEAR_STORY' });
  }, [dispatch]);

  const races: CharacterRace[] = ['Human', 'Elf', 'Dwarf', 'Halfling', 'Orc', 'Gnome'];
  const classes: CharacterClass[] = ['Warrior', 'Wizard', 'Rogue', 'Cleric', 'Ranger', 'Bard'];
  const themes: WorldTheme[] = ['Medieval', 'Dark Fantasy', 'High Magic', 'Wilderness'];

  const handleRandomCharacter = () => {
    const randomRace = races[Math.floor(Math.random() * races.length)];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const randomName = getRandomName(randomRace);
    
    setCharacter({
      ...character,
      name: randomName,
      race: randomRace,
      class: randomClass,
      inventory: []
    });
  };

  const getRandomName = (race: CharacterRace): string => {
    const namesByRace = {
      Human: ['Aldric', 'Eleanor', 'Rowan', 'Lyra', 'Gareth', 'Isolde'],
      Elf: ['Thranduil', 'Arwen', 'Legolas', 'Tauriel', 'Elrond', 'Galadriel'],
      Dwarf: ['Thorin', 'Gimli', 'Dwalin', 'Balin', 'Thrain', 'Bombur'],
      Halfling: ['Frodo', 'Bilbo', 'Samwise', 'Pippin', 'Merry', 'Rosie'],
      Orc: ['Grakk', 'Urgoth', 'Mogra', 'Zorka', 'Thulg', 'Durgash'],
      Gnome: ['Fizben', 'Tinkle', 'Sparkle', 'Fidget', 'Gadget', 'Sprocket']
    };
    
    const names = namesByRace[race];
    return names[Math.floor(Math.random() * names.length)];
  };

  const handleRandomWorld = () => {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    setWorldTheme(randomTheme);
  };

  const handleCharacterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('world');
  };

  const handleWorldSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    dispatch({ 
      type: 'SET_CHARACTER', 
      payload: character as Character 
    });
    
    dispatch({ 
      type: 'SET_WORLD_THEME', 
      payload: worldTheme 
    });
    
    dispatch({
      type: 'ADD_STORY_ENTRY',
      payload: {
        text: `Welcome to the ${worldTheme} world of Etheria. ${character.name} the ${character.race} ${character.class} begins their journey in the small village of Riverdale.`,
        type: 'narration'
      }
    });
    
    dispatch({
      type: 'SET_LOCATION',
      payload: 'Riverdale Village'
    });
    
    onComplete();
  };

  const getClassIcon = (characterClass: CharacterClass) => {
    switch(characterClass) {
      case 'Warrior': return <Swords className="h-5 w-5" />;
      case 'Wizard': return <Sparkles className="h-5 w-5" />;
      case 'Rogue': return <Dices className="h-5 w-5" />;
      case 'Cleric': return <HelpCircle className="h-5 w-5" />;
      case 'Ranger': return <BookOpen className="h-5 w-5" />;
      case 'Bard': return <User className="h-5 w-5" />;
      default: return <User className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-12 px-4" 
         style={{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(https://images.pexels.com/photos/1693095/pexels-photo-1693095.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)' }}>
      <div className="max-w-2xl mx-auto">
        <div className="bg-gray-900/80 backdrop-blur-sm p-8 rounded-lg border border-amber-800/50 shadow-2xl">
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={step === 'character' ? onBack : () => setStep('character')}
              className="mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h2 className="text-3xl font-bold text-amber-500">
              {step === 'character' ? 'Create Your Character' : 'Choose Your World'}
            </h2>
          </div>

          {step === 'character' ? (
            <form onSubmit={handleCharacterSubmit}>
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Character Name</label>
                <input
                  type="text"
                  value={character.name}
                  onChange={(e) => setCharacter({...character, name: e.target.value})}
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-300 mb-2">Race</label>
                  <div className="grid grid-cols-2 gap-2">
                    {races.map((race) => (
                      <div 
                        key={race}
                        onClick={() => setCharacter({...character, race})}
                        className={`
                          cursor-pointer p-3 rounded-md text-center transition-all
                          ${character.race === race 
                            ? 'bg-amber-700 text-white border-2 border-amber-500' 
                            : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'}
                        `}
                      >
                        {race}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">Class</label>
                  <div className="grid grid-cols-2 gap-2">
                    {classes.map((charClass) => (
                      <div 
                        key={charClass}
                        onClick={() => setCharacter({...character, class: charClass})}
                        className={`
                          cursor-pointer p-3 rounded-md text-center transition-all flex items-center justify-center gap-2
                          ${character.class === charClass 
                            ? 'bg-amber-700 text-white border-2 border-amber-500' 
                            : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'}
                        `}
                      >
                        {getClassIcon(charClass)}
                        {charClass}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleRandomCharacter}
                  className="text-amber-400 border-amber-400 hover:bg-amber-900/30"
                >
                  Random Character
                </Button>
                <Button 
                  type="submit" 
                  disabled={!character.name}
                  className="ml-auto"
                >
                  Next Step
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleWorldSubmit}>
              <p className="text-gray-300 mb-6">
                Select the type of world your adventure will take place in:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {themes.map((theme) => (
                  <div 
                    key={theme}
                    onClick={() => setWorldTheme(theme)}
                    className={`
                      cursor-pointer p-4 rounded-md transition-all
                      ${worldTheme === theme 
                        ? 'bg-amber-700 text-white border-2 border-amber-500' 
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:bg-gray-700'}
                    `}
                  >
                    <h3 className="font-bold text-lg mb-1">{theme}</h3>
                    <p className="text-sm opacity-80">
                      {theme === 'Medieval' && 'Classic fantasy setting with castles, knights, and villages.'}
                      {theme === 'Dark Fantasy' && 'Grim and dangerous world filled with horrors and tough choices.'}
                      {theme === 'High Magic' && 'World brimming with powerful magic, floating cities, and wonder.'}
                      {theme === 'Wilderness' && 'Untamed lands with vast forests, mountains, and few settlements.'}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  type="button" 
                  variant="ghost" 
                  onClick={handleRandomWorld}
                  className="text-amber-400 border-amber-400 hover:bg-amber-900/30"
                >
                  Random World
                </Button>
                <Button 
                  type="submit" 
                  className="ml-auto"
                >
                  Begin Adventure
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterSetup;