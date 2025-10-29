import React, { useState, useEffect, useCallback } from 'react';
import GameScreen from './components/GameScreen';
import ManagementScreen from './components/ManagementScreen';
import Header from './components/Header';
import HomeScreen from './components/HomeScreen';
import type { Problem, Level, Upgrade } from './types';
import { GameState } from './types';
import { LEVELS, PROBLEMS, XP_PER_CORRECT_ANSWER, COINS_PER_CORRECT_ANSWER } from './constants';
import { getHint } from './services/geminiService';

const LevelUpScreen: React.FC<{ level: Level, onContinue: () => void }> = ({ level, onContinue }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center transform transition-all scale-100 animate-jump-in">
            <h2 className="text-4xl font-bold text-yellow-500 mb-4">NAIK LEVEL!</h2>
            <p className="text-2xl text-slate-700 mb-2">Selamat! Tokomu sekarang adalah</p>
            <p className="text-3xl font-bold text-sky-600 mb-6">{level.shopName}</p>
            <button
                onClick={onContinue}
                className="bg-green-500 hover:bg-green-600 text-white font-bold text-xl py-3 px-8 rounded-lg shadow-md border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all"
            >
                Lanjutkan!
            </button>
        </div>
    </div>
);

const initial_level = LEVELS[0];
const initial_coins = 50;
const initial_xp = 0;
const initial_day = 1;

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>(GameState.HOME);
    const [level, setLevel] = useState<Level>(initial_level);
    const [xp, setXp] = useState(initial_xp);
    const [coins, setCoins] = useState(initial_coins);
    const [day, setDay] = useState(initial_day);
    const [customersServed, setCustomersServed] = useState(0);
    const [currentProblem, setCurrentProblem] = useState<Problem | null>(null);
    const [hint, setHint] = useState<string | null>(null);
    const [ownedUpgrades, setOwnedUpgrades] = useState<string[]>([]);
    const [playerName, setPlayerName] = useState('');

    const selectNewProblem = useCallback(() => {
        const availableProblems = PROBLEMS.filter(p => level.problemTypes.includes(p.type));
        const newProblem = availableProblems[Math.floor(Math.random() * availableProblems.length)];
        setCurrentProblem(newProblem);
        setHint(null);
    }, [level]);

    useEffect(() => {
        if (gameState === GameState.SERVING && !currentProblem) {
            selectNewProblem();
        }
    }, [gameState, currentProblem, selectNewProblem]);
    
    const handleCorrectAnswer = () => {
        const newXp = xp + XP_PER_CORRECT_ANSWER;
        const newCoins = coins + COINS_PER_CORRECT_ANSWER;
        
        setXp(newXp);
        setCoins(newCoins);
        
        // Check for level up
        const currentLevelInfo = LEVELS.find(l => l.level === level.level);
        if (currentLevelInfo && newXp >= currentLevelInfo.xpToNextLevel) {
            const nextLevelIndex = LEVELS.findIndex(l => l.level === level.level + 1);
            if (nextLevelIndex !== -1) {
                setLevel(LEVELS[nextLevelIndex]);
                setGameState(GameState.LEVEL_UP);
                return; // Stop further processing to show level up screen
            }
        }
        
        const nextCustomer = customersServed + 1;
        if (nextCustomer >= level.customersPerDay) {
            setGameState(GameState.MANAGEMENT);
        } else {
            setCustomersServed(nextCustomer);
            selectNewProblem();
        }
    };
    
    const handleIncorrectAnswer = async (playerAnswer: string) => {
        if (currentProblem) {
            const newHint = await getHint(currentProblem.question, playerAnswer);
            setHint(newHint);
        }
    };

    const handleStartNextDay = () => {
        setDay(d => d + 1);
        setCustomersServed(0);
        selectNewProblem();
        setGameState(GameState.SERVING);
    };

    const handleBuyUpgrade = (upgrade: Upgrade) => {
        if (coins >= upgrade.cost && !ownedUpgrades.includes(upgrade.id)) {
            setCoins(c => c - upgrade.cost);
            setOwnedUpgrades(prev => [...prev, upgrade.id]);
        }
    };

    const handleLevelUpContinue = () => {
        const nextCustomer = customersServed + 1;
        if (nextCustomer >= level.customersPerDay) {
            setGameState(GameState.MANAGEMENT);
        } else {
            setCustomersServed(nextCustomer);
            selectNewProblem();
            setGameState(GameState.SERVING);
        }
    };
    
    const resetGame = () => {
        setLevel(initial_level);
        setXp(initial_xp);
        setCoins(initial_coins);
        setDay(initial_day);
        setCustomersServed(0);
        setCurrentProblem(null);
        setHint(null);
        setOwnedUpgrades([]);
    };
    
    const handleStartGame = (name: string) => {
        resetGame();
        setPlayerName(name);
        setGameState(GameState.SERVING);
    };

    const handleGoHome = () => {
        setGameState(GameState.HOME);
        setPlayerName('');
        // Optional: reset game state fully when going home
        resetGame();
    };

    return (
        <div className="min-h-screen bg-amber-50">
            {gameState !== GameState.HOME && <Header level={level} coins={coins} xp={xp} playerName={playerName} onGoHome={handleGoHome} />}
            <main>
                {gameState === GameState.HOME && <HomeScreen onStartGame={handleStartGame} />}
                {gameState === GameState.SERVING && currentProblem && (
                    <GameScreen 
                        problem={currentProblem}
                        onCorrect={handleCorrectAnswer}
                        onIncorrect={handleIncorrectAnswer}
                        hint={hint}
                        day={day}
                        customerNumber={customersServed + 1}
                        totalCustomers={level.customersPerDay}
                    />
                )}
                {gameState === GameState.MANAGEMENT && (
                    <ManagementScreen
                        day={day}
                        coins={coins}
                        ownedUpgrades={ownedUpgrades}
                        playerName={playerName}
                        onStartNextDay={handleStartNextDay}
                        onBuyUpgrade={handleBuyUpgrade}
                    />
                )}
                {gameState === GameState.LEVEL_UP && (
                    <LevelUpScreen level={level} onContinue={handleLevelUpContinue} />
                )}
            </main>
        </div>
    );
};

export default App;