import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

type Screen = 'menu' | 'characters' | 'maps' | 'roles' | 'game' | 'leaderboard' | 'settings';

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

type LeaderboardEntry = {
  name: string;
  score: number;
  level: number;
  date: string;
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
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('labubu-leaderboard');
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  const playSound = (type: 'click' | 'win' | 'found') => {
    if (!soundEnabled) return;
    const audio = new Audio();
    if (type === 'click') audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSp+zfPWijgIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSp+zfPWjDoIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBQ==';
    if (type === 'win') audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSp+zfPWijgIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSp+zfPWijgIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBQ==';
    if (type === 'found') audio.src = 'data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSp+zfPWijgIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSp+zfPWijgIF2W58OShUhELTKXh8bllHAU2jdXyzHksBSh9zfPWjDoIF2a58OWhUhELTKXh8bllHAU2jdXyzHksBQ==';
    audio.play().catch(() => {});
  };

  const getDifficultyTime = () => {
    if (difficulty === 'easy') return 90;
    if (difficulty === 'medium') return 60;
    return 45;
  };

  const getRequiredPlayers = () => {
    return Math.min(3 + level, 10);
  };

  const startGame = () => {
    setIsPlaying(true);
    setGameTime(getDifficultyTime());
    setFoundPlayers(0);
    playSound('click');
    
    const timer = setInterval(() => {
      setGameTime((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsPlaying(false);
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const endGame = () => {
    if (role === 'seeker') {
      const required = getRequiredPlayers();
      if (foundPlayers >= required) {
        const points = foundPlayers * 10 * level;
        setScore(score + points);
        setLevel(level + 1);
        playSound('win');
        toast({
          title: "🎉 Уровень пройден!",
          description: `Ты нашёл всех! +${points} очков. Уровень ${level + 1}!`,
        });
      } else {
        playSound('click');
        toast({
          title: "😢 Попробуй ещё раз",
          description: `Нужно найти ${required} игроков. Ты нашёл ${foundPlayers}.`,
        });
      }
    } else {
      const points = gameTime * level;
      setScore(score + points);
      setLevel(level + 1);
      playSound('win');
      toast({
        title: "🎉 Ты выжил!",
        description: `+${points} очков за выживание!`,
      });
    }
  };

  const saveScore = () => {
    const newEntry: LeaderboardEntry = {
      name: selectedCharacter?.name || 'Игрок',
      score,
      level,
      date: new Date().toLocaleDateString(),
    };
    const updated = [...leaderboard, newEntry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
    setLeaderboard(updated);
    localStorage.setItem('labubu-leaderboard', JSON.stringify(updated));
  };

  if (screen === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 flex flex-col items-center justify-center p-6">
        <div className="text-center mb-8 bounce-gentle">
          <h1 className="text-6xl md:text-7xl font-bold mb-4">😱Прятки от Лабубу😍</h1>
          <p className="text-2xl text-purple-700 font-semibold">Беги и прячься!</p>
          {score > 0 && (
            <div className="mt-4 flex items-center justify-center gap-6 text-xl font-bold">
              <div className="bg-yellow-400 text-purple-800 px-6 py-2 rounded-full shadow-lg">
                🏆 Очки: {score}
              </div>
              <div className="bg-green-400 text-white px-6 py-2 rounded-full shadow-lg">
                ⭐ Уровень: {level}
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full mb-6">
          <Button
            onClick={() => { playSound('click'); setScreen('characters'); }}
            size="lg"
            className="h-28 text-xl font-bold bg-pink-500 hover:bg-pink-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="User" className="mr-3" size={28} />
            Персонажи
          </Button>
          
          <Button
            onClick={() => { playSound('click'); setScreen('maps'); }}
            size="lg"
            className="h-28 text-xl font-bold bg-purple-500 hover:bg-purple-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="Map" className="mr-3" size={28} />
            Карты
          </Button>
          
          <Button
            onClick={() => { playSound('click'); setScreen('roles'); }}
            size="lg"
            className="h-28 text-xl font-bold bg-green-500 hover:bg-green-600 text-white shadow-xl hover:scale-105 transition-transform rounded-3xl"
          >
            <Icon name="Users" className="mr-3" size={28} />
            Роли
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
            className="h-28 text-xl font-bold bg-yellow-500 hover:bg-yellow-600 text-white shadow-xl hover:scale-105 transition-transform disabled:opacity-50 disabled:hover:scale-100 rounded-3xl"
          >
            <Icon name="Play" className="mr-3" size={28} />
            Играть!
          </Button>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => { playSound('click'); setScreen('leaderboard'); }}
            variant="outline"
            className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-purple-400 bg-white/80"
          >
            <Icon name="Trophy" className="mr-2" />
            Рейтинг
          </Button>
          <Button
            onClick={() => { playSound('click'); setScreen('settings'); }}
            variant="outline"
            className="h-16 px-8 text-lg font-bold rounded-2xl border-2 border-purple-400 bg-white/80"
          >
            <Icon name="Settings" className="mr-2" />
            Настройки
          </Button>
        </div>

        {selectedCharacter && (
          <div className="mt-6 text-center animate-fade-in">
            <p className="text-lg font-semibold text-purple-700">
              <span className="text-3xl">{selectedCharacter.emoji}</span> {selectedCharacter.name}
              {selectedMap && <> • <span className="text-3xl">{selectedMap.emoji}</span> {selectedMap.name}</>}
              {role && <> • {role === 'seeker' ? '😈 Искатель' : '😰 Прячущийся'}</>}
            </p>
          </div>
        )}
      </div>
    );
  }

  if (screen === 'leaderboard') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6">
        <div className="max-w-3xl mx-auto">
          <Button
            onClick={() => { playSound('click'); setScreen('menu'); }}
            variant="outline"
            className="mb-6 rounded-2xl border-2 border-purple-400"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>

          <h2 className="text-5xl font-bold text-center mb-8 text-purple-700">🏆 Рейтинг</h2>

          {leaderboard.length === 0 ? (
            <Card className="p-12 text-center rounded-3xl bg-white/90 shadow-xl">
              <div className="text-7xl mb-4">🎮</div>
              <p className="text-2xl font-semibold text-purple-700">Рейтинг пуст</p>
              <p className="text-lg text-purple-600 mt-2">Сыграй первую игру!</p>
            </Card>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <Card
                  key={index}
                  className="p-6 rounded-3xl bg-white/90 shadow-xl border-4 border-white hover:scale-102 transition-transform"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-4xl font-bold text-purple-700">
                        {index === 0 && '🥇'}
                        {index === 1 && '🥈'}
                        {index === 2 && '🥉'}
                        {index > 2 && `${index + 1}.`}
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-purple-800">{entry.name}</p>
                        <p className="text-sm text-purple-600">{entry.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-yellow-600">{entry.score}</p>
                      <p className="text-sm text-purple-600">Уровень {entry.level}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'settings') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          <Button
            onClick={() => { playSound('click'); setScreen('menu'); }}
            variant="outline"
            className="mb-6 rounded-2xl border-2 border-purple-400"
          >
            <Icon name="ArrowLeft" className="mr-2" />
            Назад
          </Button>

          <h2 className="text-5xl font-bold text-center mb-8 text-purple-700">⚙️ Настройки</h2>

          <Card className="p-8 rounded-3xl bg-white/90 shadow-xl space-y-6">
            <div>
              <p className="text-2xl font-bold text-purple-700 mb-4">🔊 Звук</p>
              <div className="flex gap-4">
                <Button
                  onClick={() => { setSoundEnabled(true); playSound('click'); }}
                  className={`flex-1 h-16 text-xl rounded-2xl ${
                    soundEnabled ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  Включен
                </Button>
                <Button
                  onClick={() => setSoundEnabled(false)}
                  className={`flex-1 h-16 text-xl rounded-2xl ${
                    !soundEnabled ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  Выключен
                </Button>
              </div>
            </div>

            <div>
              <p className="text-2xl font-bold text-purple-700 mb-4">⚡ Сложность</p>
              <div className="grid grid-cols-3 gap-4">
                <Button
                  onClick={() => { setDifficulty('easy'); playSound('click'); }}
                  className={`h-20 text-lg rounded-2xl ${
                    difficulty === 'easy' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  <div>
                    <div>😊 Легко</div>
                    <div className="text-sm">90 сек</div>
                  </div>
                </Button>
                <Button
                  onClick={() => { setDifficulty('medium'); playSound('click'); }}
                  className={`h-20 text-lg rounded-2xl ${
                    difficulty === 'medium' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  <div>
                    <div>😐 Средне</div>
                    <div className="text-sm">60 сек</div>
                  </div>
                </Button>
                <Button
                  onClick={() => { setDifficulty('hard'); playSound('click'); }}
                  className={`h-20 text-lg rounded-2xl ${
                    difficulty === 'hard' ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                >
                  <div>
                    <div>😱 Сложно</div>
                    <div className="text-sm">45 сек</div>
                  </div>
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t-2 border-purple-200">
              <Button
                onClick={() => {
                  if (confirm('Сбросить весь прогресс?')) {
                    setScore(0);
                    setLevel(1);
                    setLeaderboard([]);
                    localStorage.removeItem('labubu-leaderboard');
                    playSound('click');
                    toast({
                      title: "🔄 Прогресс сброшен",
                      description: "Начни заново!",
                    });
                  }
                }}
                variant="outline"
                className="w-full h-16 text-xl font-bold rounded-2xl border-2 border-red-400 text-red-600 hover:bg-red-50"
              >
                <Icon name="RotateCcw" className="mr-2" />
                Сбросить прогресс
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (screen === 'characters') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-yellow-200 p-6">
        <div className="max-w-5xl mx-auto">
          <Button
            onClick={() => { playSound('click'); setScreen('menu'); }}
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
                  playSound('click');
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
            onClick={() => { playSound('click'); setScreen('menu'); }}
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
                  playSound('click');
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
            onClick={() => { playSound('click'); setScreen('menu'); }}
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
                playSound('click');
                setScreen('menu');
              }}
              className={`p-12 cursor-pointer hover:scale-105 transition-transform rounded-3xl ${
                role === 'seeker' ? 'ring-4 ring-red-500' : ''
              } bg-gradient-to-br from-red-400 to-pink-500 border-4 border-white shadow-xl`}
            >
              <div className="text-center">
                <div className="text-9xl mb-6 bounce-gentle">😈</div>
                <p className="text-3xl font-bold text-white mb-3">Лабубу</p>
                <p className="text-xl text-white">Ищи игроков!</p>
                <p className="text-sm text-white/80 mt-2">Найди {getRequiredPlayers()} игроков</p>
              </div>
            </Card>

            <Card
              onClick={() => {
                setRole('hider');
                playSound('click');
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
                <p className="text-sm text-white/80 mt-2">Выживи {getDifficultyTime()} секунд</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (screen === 'game') {
    const required = getRequiredPlayers();
    
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
                <div className={`text-6xl font-bold mt-2 ${gameTime < 10 ? 'text-red-600 animate-pulse' : 'text-pink-600'}`}>
                  {gameTime}с
                </div>
              </div>

              <div className="text-center">
                <p className="text-xl font-semibold text-purple-700">Уровень</p>
                <div className="text-5xl mt-2 font-bold text-purple-700">{level}</div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-3xl font-bold mb-2 text-purple-700">
                {role === 'seeker' ? '😈 Ты Лабубу! Найди всех!' : '😰 Прячься от Лабубу!'}
              </p>
              {role === 'seeker' && (
                <p className="text-xl text-purple-600">Нужно найти: {required} игроков</p>
              )}
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
                          onClick={() => {
                            setFoundPlayers(foundPlayers + 1);
                            playSound('found');
                          }}
                          className="text-xl h-16 px-8 bg-green-500 hover:bg-green-600 rounded-2xl"
                        >
                          Нашёл! 🎯
                        </Button>
                      </div>
                      <p className="text-2xl font-semibold text-green-600">
                        Найдено: {foundPlayers} / {required}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-3xl font-bold mb-6 text-purple-700">Прячься быстрее!</p>
                      <div className="flex justify-center gap-4 flex-wrap">
                        <Button 
                          onClick={() => playSound('click')}
                          className="text-xl h-16 px-8 bg-purple-500 hover:bg-purple-600 rounded-2xl"
                        >
                          За деревом 🌳
                        </Button>
                        <Button 
                          onClick={() => playSound('click')}
                          className="text-xl h-16 px-8 bg-blue-500 hover:bg-blue-600 rounded-2xl"
                        >
                          В кустах 🌿
                        </Button>
                        <Button 
                          onClick={() => playSound('click')}
                          className="text-xl h-16 px-8 bg-yellow-500 hover:bg-yellow-600 rounded-2xl"
                        >
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
                    <p className="text-2xl font-semibold text-green-600 mb-4">
                      Ты нашёл {foundPlayers} / {required} игроков
                    </p>
                  )}
                  <p className="text-3xl font-bold text-yellow-600 mb-8">
                    Очки: {score} • Уровень: {level}
                  </p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => {
                        saveScore();
                        setScreen('menu');
                        setGameTime(getDifficultyTime());
                        setFoundPlayers(0);
                        playSound('click');
                      }}
                      className="text-2xl h-16 px-12 bg-pink-500 hover:bg-pink-600 rounded-2xl"
                    >
                      В меню
                    </Button>
                    <Button
                      onClick={() => {
                        startGame();
                      }}
                      className="text-2xl h-16 px-12 bg-green-500 hover:bg-green-600 rounded-2xl"
                    >
                      Ещё раз
                    </Button>
                  </div>
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
