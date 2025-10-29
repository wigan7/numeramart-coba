import React from 'react';
import { CoinIcon, StarIcon, HomeIcon } from './Icons';
import ProgressBar from './ProgressBar';
import type { Level } from '../types';

interface HeaderProps {
  level: Level;
  coins: number;
  xp: number;
  playerName: string;
  onGoHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ level, coins, xp, playerName, onGoHome }) => {
  return (
    <header className="bg-sky-400 p-4 rounded-b-2xl shadow-lg border-b-4 border-sky-600 sticky top-0 z-10">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4">
            <button onClick={onGoHome} title="Kembali ke Menu Utama" className="p-2 bg-white/30 rounded-full text-white hover:bg-white/50 transition-colors">
                <HomeIcon className="w-6 h-6"/>
            </button>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">{level.shopName} milik {playerName}</h1>
              <p className="text-lg text-sky-100">Level {level.level}</p>
            </div>
        </div>
        <div className="flex items-center gap-4 md:gap-6 bg-white/30 p-2 rounded-full">
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-inner">
            <CoinIcon className="w-6 h-6 text-yellow-500" />
            <span className="text-xl font-bold text-slate-700">{coins}</span>
          </div>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-full shadow-inner">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <span className="text-xl font-bold text-slate-700">{xp}</span>
          </div>
        </div>
        <div className="w-full sm:w-1/3">
           <ProgressBar value={xp} max={level.xpToNextLevel} label="XP" />
        </div>
      </div>
    </header>
  );
};

export default Header;