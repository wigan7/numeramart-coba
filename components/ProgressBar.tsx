
import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value, max, label }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-blue-700">{label}</span>
        <span className="text-sm font-medium text-blue-700">{value} / {max}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-slate-300">
        <div 
          className="bg-yellow-400 h-full rounded-full transition-all duration-500" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
