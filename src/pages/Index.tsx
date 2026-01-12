import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

type Screen = 'menu' | 'characters' | 'maps' | 'roles' | 'game';

type Character = {
  id: number;
  name: string;
  emoji: string;
  color: string;
};

type Map = {
  id: number;
  name: string;
  emoji: string;
  description: string;
};

const characters: Character[] = [
  { id: 1, name: 'Котик', emoji: '🐱', color: 'bg-pink-400' },
  { id: 2, name: 'Песик', emoji: '🐶', color: 'bg-yellow-400' },
  { id: 3, name: 'Зайчик', emoji: '🐰', color: 'bg-purple-400' },
  { id: 4, name: 'Лисичка', emoji: '🦊', color: 'bg-orange-400' },
  { id: 5, name: 'Панда', emoji: '🐼', color: 'bg-green-400' },
  { id: 6, name: 'Хомячок', emoji: '🐹', color: 'bg-blue-400' },
];

const maps: Map[] = [
  { id: 1, name: 'Детский сад', emoji: '🏫', description: 'Много комнат и укрытий!' },
  { id: 2, name: 'Парк развлечений', emoji: '🎡', description: 'Карусели и аттракционы!' },
  { id: 3, name: 'Волшебный лес', emoji: '🌳', description: 'Деревья и кусты!' },
];

export default function Index() {
  const [screen, setScreen] = useState<Screen>('menu');
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const [selectedMap, setSelectedMap] = useState<Map | null>(null);
  const [role, setRole] = useState<'hider' | 'seeker' | null>(null);
  const [gameTime, setGameTime] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [foundPlayers, setFoundPlayers] = useState(0);

  const startGame = () => {
    setIsPlaying(true);
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-12 bounce-gentle">
          <h1 className="text-7xl font-bold mb-4">😱Прятки от Лабубу😍</h1>
          <p className="text-2xl text-purple-700 font-semibold">Беги и прячься!</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl w-full">
          <Button
            onClick={() => setScreen('characters')}
            size="lg"
            className="h-32 text-2xl font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="User" className="mr-3" size={32} />
            Выбрать персонажа
          </Button>
          
          <Button
            onClick={() => setScreen('maps')}
            size="lg"
            className="h-32 text-2xl font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="Map" className="mr-3" size={32} />
            Выбрать карту
          </Button>
          
          <Button
            onClick={() => setScreen('roles')}
            size="lg"
            className="h-32 text-2xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="Users" className="mr-3" size={32} />
            Выбрать роль
          </Button>
          
          <Button
            onClick={() => {
              if (selectedCharacter && selectedMap && role) {
                setScreen('game');
                startGame();
              }
            }}
            disabled={!selectedCharacter || !selectedMap || !role}
            size="lg"
            className="h-32 text-2xl font-bold bg-yellow-500 hover:bg-yellow-600 text-white shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 rounded-3xl"
          >
            <Icon name="Play" className="mr-3" size={32} />
            Начать игру!
          </Button>
        </div>

        {selectedCharacter && (
          <div className="mt-8 text-center animate-fade-in">
            <p className="text-xl font-semibold text-purple-700">
              Персонаж: <span className="text-3xl">{selectedCharacter.emoji}</span> {selectedCharacter.name}
            </p>
          </div>
        )}
        {selectedMap && (
          <div className="mt-2 text-center animate-fade-in">
            <p className="text-xl font-semibold text-purple-700">
              Карта: <span className="text-3xl">{selectedMap.emoji}</span> {selectedMap.name}
            </p>
          </div>
        )}
        {role && (
          <div className="mt-2 text-center animate-fade-in">
            <p className="text-xl font-semibold text-purple-700">
              Роль: {role === 'seeker' ? '😈 Лабубу-искатель' : '😰 Прячущийся'}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'characters') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6">
        <div className="max-w-5xl mx-auto">
          <Button
            onClick={() => setScreen('menu')}
            variant="outline"
            className="mb-6 rounded-2xl border-2 border-purple-400"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>

          <h2 className="text-5xl font-bold text-center mb-8 text-purple-700">Выбери персонажа</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {characters.map((char) => (
              <Card
                key={char.id}
                onClick={() => {
                  setSelectedCharacter(char);
                  setScreen('menu');
                }}
                className={`p-6 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${
                  selectedCharacter?.id === char.id ? 'ring-4 ring-purple-500' : ''
                } ${char.color} border-4 border-white shadow-xl`}
              >
                <div className="text-center">
                  <div className="text-7xl mb-4 wiggle">{char.emoji}</div>
                  <p className="text-2xl font-bold text-white">{char.name}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'maps') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => setScreen('menu')}
            variant="outline"
            className="mb-6 rounded-2xl border-2 border-purple-400"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>

          <h2 className="text-5xl font-bold text-center mb-8 text-purple-700">Выбери карту</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {maps.map((map) => (
              <Card
                key={map.id}
                onClick={() => {
                  setSelectedMap(map);
                  setScreen('menu');
                }}
                className={`p-8 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${
                  selectedMap?.id === map.id ? 'ring-4 ring-pink-500' : ''
                } bg-gradient-to-br from-yellow-300 to-orange-300 border-4 border-white shadow-xl`}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4">{map.emoji}</div>
                  <p className="text-2xl font-bold text-purple-700 mb-2">{map.name}</p>
                  <p className="text-lg text-purple-600">{map.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'roles') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6 flex items-center justify-center">
        <div className="max-w-3xl w-full">
          <Button
            onClick={() => setScreen('menu')}
            variant="outline"
            className="mb-6 rounded-2xl border-2 border-purple-400"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>

          <h2 className="text-5xl font-bold text-center mb-12 text-purple-700">Выбери роль</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card
              onClick={() => {
                setRole('seeker');
                setScreen('menu');
              }}
              className={`p-12 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${
                role === 'seeker' ? 'ring-4 ring-red-500' : ''
              } bg-gradient-to-br from-red-400 to-pink-500 border-4 border-white shadow-xl`}
            >
              <div className="text-center">
                <div className="text-9xl mb-6 bounce-gentle">😈</div>
                <p className="text-3xl font-bold text-white mb-3">Лабубу</p>
                <p className="text-xl text-white">Ищи остальных игроков!</p>
              </div>
            </Card>

            <Card
              onClick={() => {
                setRole('hider');
                setScreen('menu');
              }}
              className={`p-12 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${
                role === 'hider' ? 'ring-4 ring-blue-500' : ''
              } bg-gradient-to-br from-blue-400 to-green-400 border-4 border-white shadow-xl`}
            >
              <div className="text-center">
                <div className="text-9xl mb-6 bounce-gentle">😰</div>
                <p className="text-3xl font-bold text-white mb-3">Прячущийся</p>
                <p className="text-xl text-white">Прячься от Лабубу!</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'game') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/90 backdrop-blur rounded-3xl p-8 shadow-2xl border-4 border-purple-400 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="text-center">
                <p className="text-xl font-semibold text-purple-700">Персонаж</p>
                <div className="text-5xl mt-2">{selectedCharacter?.emoji}</div>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold text-purple-700">Время</p>
                <div className="text-6xl font-bold text-pink-600 mt-2">{gameTime}с</div>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold text-purple-700">Карта</p>
                <div className="text-5xl mt-2">{selectedMap?.emoji}</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold mb-4 text-purple-700">
                {role === 'seeker' ? '😈 Ты Лабубу! Найди всех!' : '😰 Прячься от Лабубу!'}
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur rounded-3xl p-12 shadow-2xl border-4 border-white min-h-96 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-200/50 to-blue-200/50"></div>
            
            <div className="relative z-10">
              {isPlaying ? (
                <div className="text-center">
                  <div className="text-9xl mb-8 bounce-gentle">
                    {role === 'seeker' ? '😈' : '😰'}
                  </div>
                  
                  {role === 'seeker' ? (
                    <div>
                      <p className="text-3xl font-bold mb-6 text-purple-700">Ищи игроков!</p>
                      <div className="flex justify-center gap-4 mb-6">
                        <Button
                          onClick={() => setFoundPlayers(foundPlayers + 1)}
                          className="text-xl h-16 px-8 bg-green-500 hover:bg-green-600 rounded-2xl"
                        >
                          Нашёл! 🎯
                        </Button>
                      </div>
                      <p className="text-2xl font-semibold text-green-600">
                        Найдено игроков: {foundPlayers}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold mb-6 text-purple-700">Прячься быстрее!</p>
                      <div className="flex justify-center gap-4 flex-wrap">
                        <Button className="text-xl h-16 px-8 bg-purple-500 hover:bg-purple-600 rounded-2xl">
                          За деревом 🌳
                        </Button>
                        <Button className="text-xl h-16 px-8 bg-blue-500 hover:bg-blue-600 rounded-2xl">
                          В кустах 🌿
                        </Button>
                        <Button className="text-xl h-16 px-8 bg-yellow-500 hover:bg-yellow-600 rounded-2xl">
                          В домике 🏠
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center">
                  <div className="text-9xl mb-6">🎉</div>
                  <p className="text-4xl font-bold mb-6 text-purple-700">Игра окончена!</p>
                  {role === 'seeker' && (
                    <p className="text-2xl font-semibold text-green-600 mb-8">
                      Ты нашёл {foundPlayers} игроков!
                    </p>
                  )}
                  <Button
                    onClick={() => {
                      setScreen('menu');
                      setGameTime(60);
                      setFoundPlayers(0);
                    }}
                    className="text-2xl h-16 px-12 bg-pink-500 hover:bg-pink-600 rounded-2xl"
                  >
                    Вернуться в меню
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
