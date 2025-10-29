import React, { useState, useEffect } from 'react';
import type { Problem } from '../types';
import { CUSTOMER_AVATARS } from '../constants';
import Scratchpad from './Scratchpad';

interface GameScreenProps {
    problem: Problem;
    onCorrect: () => void;
    onIncorrect: (answer: string) => void;
    hint: string | null;
    day: number;
    customerNumber: number;
    totalCustomers: number;
}

const GameScreen: React.FC<GameScreenProps> = ({ problem, onCorrect, onIncorrect, hint, day, customerNumber, totalCustomers }) => {
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [customerAvatar, setCustomerAvatar] = useState('');

    useEffect(() => {
        // Assign a consistent avatar for the customer based on day and number
        const avatarIndex = (day + customerNumber) % CUSTOMER_AVATARS.length;
        setCustomerAvatar(CUSTOMER_AVATARS[avatarIndex]);
        
        // Reset state for new problem
        setAnswer('');
        setFeedback('');
    }, [problem, day, customerNumber]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const playerAnswer = parseInt(answer, 10);

        if (isNaN(playerAnswer)) {
            setFeedback("Jawaban harus angka ya!");
            return;
        }

        if (playerAnswer === problem.answer) {
            setFeedback('Benar! Hebat!');
            // Use a timeout to let the user see the positive feedback before moving on
            setTimeout(() => {
                onCorrect();
            }, 1200);
        } else {
            setFeedback('Hmm, coba lagi yuk!');
            onIncorrect(answer);
        }
    };

    return (
        <div className="p-4 md:p-8 bg-sky-100 min-h-[calc(100vh-120px)] flex items-center justify-center">
            <div className="max-w-4xl w-full mx-auto bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-xl flex flex-col md:flex-row gap-8">
                
                {/* Left side: Customer and problem */}
                <div className="w-full md:w-1/2">
                    <div className="mb-4">
                        <p className="text-xl text-slate-600 text-center">
                            Hari ke-{day} | Pelanggan {customerNumber} dari {totalCustomers}
                        </p>
                    </div>
                    <div className="bg-yellow-50 p-6 rounded-lg shadow-md text-center border-2 border-yellow-200">
                        <img src={customerAvatar} alt="Customer" className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-yellow-300 shadow-lg"/>
                        <div className="relative bg-white p-4 rounded-lg shadow-inner">
                            <p className="text-xl font-semibold text-slate-700">
                                "{problem.question}"
                            </p>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white"></div>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
                            <input 
                                type="number"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder="Ketik jawabanmu..."
                                className="p-3 text-2xl text-center border-2 border-slate-300 rounded-lg focus:ring-4 focus:ring-orange-300 focus:border-orange-500 transition"
                                autoFocus
                            />
                            <button
                                type="submit"
                                disabled={!!feedback}
                                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold text-2xl py-3 rounded-lg shadow-md border-b-4 border-green-700 active:border-b-0 active:translate-y-1 transition-all disabled:bg-gray-400 disabled:border-gray-500"
                            >
                                Jawab
                            </button>
                        </form>
                        
                        {/* Feedback and Hint Area */}
                        <div className="mt-4 min-h-[60px] flex items-center justify-center p-2">
                             {feedback && !hint && (
                                <p className={`text-lg font-bold p-3 rounded-lg ${problem.answer === parseInt(answer, 10) ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                                    {feedback}
                                </p>
                            )}
                            {hint && (
                                <p className="text-lg text-blue-700 bg-blue-100 p-3 rounded-lg animate-fade-in">
                                    <strong>Petunjuk:</strong> {hint}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side: Scratchpad */}
                <div className="w-full md:w-1/2 flex items-center justify-center">
                    <Scratchpad />
                </div>
            </div>
        </div>
    );
};

export default GameScreen;
