import React from 'react';
import type { Upgrade } from '../types';
import { UPGRADES } from '../constants';
import { CoinIcon } from './Icons';

interface UpgradeItemProps {
    upgrade: Upgrade;
    onBuy: (upgrade: Upgrade) => void;
    canAfford: boolean;
    isOwned: boolean;
}

const UpgradeItem: React.FC<UpgradeItemProps> = ({ upgrade, onBuy, canAfford, isOwned }) => {
    return (
        <div className={`p-4 rounded-lg shadow-md flex flex-col items-center text-center transition-all ${isOwned ? 'bg-green-200 border-green-400' : 'bg-white border-gray-200'} border-2`}>
            <upgrade.icon className="w-16 h-16 text-sky-500 mb-2" />
            <h3 className="text-lg font-bold text-slate-800">{upgrade.name}</h3>
            <p className="text-sm text-slate-600 flex-grow mb-2">{upgrade.description}</p>
            {isOwned ? (
                 <p className="font-bold text-green-700">Sudah Dibeli</p>
            ) : (
                <button
                    onClick={() => onBuy(upgrade)}
                    disabled={!canAfford}
                    className="w-full mt-2 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-bold py-2 px-4 rounded-lg border-b-4 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400"
                >
                    <CoinIcon className="w-5 h-5" />
                    <span>{upgrade.cost}</span>
                </button>
            )}
        </div>
    );
}

interface ManagementScreenProps {
    day: number;
    coins: number;
    ownedUpgrades: string[];
    playerName: string;
    onStartNextDay: () => void;
    onBuyUpgrade: (upgrade: Upgrade) => void;
}

const ManagementScreen: React.FC<ManagementScreenProps> = ({ day, coins, ownedUpgrades, playerName, onStartNextDay, onBuyUpgrade }) => {
  return (
    <div className="p-4 md:p-8 bg-sky-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
        <h2 className="text-4xl font-bold text-center text-sky-700 mb-2">Toko Tutup!</h2>
        <p className="text-xl text-center text-slate-600 mb-6">Laporan Harian untuk {playerName} di Hari ke-{day}</p>

        <div className="bg-green-100 p-4 rounded-lg mb-8 text-center">
            <h3 className="text-2xl font-semibold text-green-800">Uang yang kamu punya:</h3>
            <div className="flex items-center justify-center gap-2 mt-2">
                <CoinIcon className="w-8 h-8 text-yellow-500" />
                <span className="text-3xl font-bold text-slate-700">{coins}</span>
            </div>
        </div>

        <h3 className="text-2xl font-bold text-slate-700 mb-4 text-center">Upgrade Toko</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {UPGRADES.map(upgrade => (
                <UpgradeItem
                    key={upgrade.id}
                    upgrade={upgrade}
                    onBuy={onBuyUpgrade}
                    canAfford={coins >= upgrade.cost}
                    isOwned={ownedUpgrades.includes(upgrade.id)}
                />
            ))}
        </div>
        
        <button 
            onClick={onStartNextDay}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl py-4 rounded-lg shadow-md border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all"
        >
            Mulai Hari Berikutnya!
        </button>
      </div>
    </div>
  );
};

export default ManagementScreen;