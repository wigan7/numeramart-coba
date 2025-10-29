import React, { useState } from 'react';
import { BuildingStorefrontIcon } from './Icons';

interface HomeScreenProps {
    onStartGame: (playerName: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onStartGame }) => {
    const [playerName, setPlayerName] = useState('');

    const handleStart = () => {
        if (playerName.trim()) {
            onStartGame(playerName.trim());
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-sky-100 p-4 text-center">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl max-w-2xl w-full">
                <BuildingStorefrontIcon className="w-24 h-24 mx-auto text-sky-500 mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-sky-700 mb-2">
                    KRASIKA NumeraMart
                </h1>
                <p className="text-xl text-slate-600 mb-8">
                    🛒 Petualangan Wirausahawan Cilik 🛒
                </p>
                <div className="mb-8">
                    <label htmlFor="playerName" className="block text-lg font-medium text-slate-700 mb-2">Siapa nama wirausahawan cilik kita?</label>
                    <input
                        id="playerName"
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Ketik namamu di sini..."
                        className="w-full max-w-sm mx-auto p-3 text-xl text-center border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition"
                    />
                </div>
                <button
                    onClick={handleStart}
                    disabled={!playerName.trim()}
                    className="w-full max-w-sm mx-auto bg-orange-500 hover:bg-orange-600 text-white font-bold text-2xl py-4 rounded-lg shadow-md border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 transition-all disabled:bg-gray-400 disabled:border-gray-500 disabled:cursor-not-allowed"
                >
                    Mulai Bermain!
                </button>
            </div>
        </div>
    );
};

export default HomeScreen;