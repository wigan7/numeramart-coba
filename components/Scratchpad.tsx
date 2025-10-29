import React, { useRef, useEffect, useState } from 'react';

type Mode = 'DRAW' | 'TYPE';

const Scratchpad: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [mode, setMode] = useState<Mode>('DRAW');
    const [textValue, setTextValue] = useState('');

    useEffect(() => {
        if (mode === 'DRAW') {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const ratio = window.devicePixelRatio || 1;
            canvas.width = canvas.offsetWidth * ratio;
            canvas.height = canvas.offsetHeight * ratio;
            canvas.style.width = `${canvas.offsetWidth}px`;
            canvas.style.height = `${canvas.offsetHeight}px`;

            const context = canvas.getContext('2d');
            if (!context) return;

            context.scale(ratio, ratio);
            context.lineCap = 'round';
            context.strokeStyle = '#dc2626'; // Changed to red
            context.lineWidth = 3;
            contextRef.current = context;
        }
    }, [mode]);

    const getCoordinates = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!canvasRef.current) return null;
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();

        if (event.nativeEvent instanceof TouchEvent) {
            if (event.nativeEvent.touches.length === 0) return null;
            return {
                x: event.nativeEvent.touches[0].clientX - rect.left,
                y: event.nativeEvent.touches[0].clientY - rect.top,
            };
        } else if (event.nativeEvent instanceof MouseEvent) {
            return {
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY,
            };
        }
        return null;
    }

    const startDrawing = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const coords = getCoordinates(event);
        if (!coords || !contextRef.current) return;

        contextRef.current.beginPath();
        contextRef.current.moveTo(coords.x, coords.y);
        setIsDrawing(true);
        event.preventDefault();
    };

    const finishDrawing = () => {
        if (!contextRef.current) return;
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = (event: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;
        const coords = getCoordinates(event);
        if (!coords || !contextRef.current) return;
        
        contextRef.current.lineTo(coords.x, coords.y);
        contextRef.current.stroke();
        event.preventDefault();
    };

    const clearInputs = () => {
        // Clear canvas
        const context = contextRef.current;
        const canvas = canvasRef.current;
        if (context && canvas) {
            context.clearRect(0, 0, canvas.width, canvas.height);
        }
        // Clear text
        setTextValue('');
    };

    const commonButtonClass = "px-4 py-2 rounded-md font-semibold transition-colors";
    const activeClass = "bg-sky-500 text-white shadow";
    const inactiveClass = "bg-gray-200 text-gray-700 hover:bg-gray-300";

    return (
        <div className="w-full h-full flex flex-col items-center bg-yellow-50 border-4 border-yellow-200 rounded-lg p-4 shadow-inner">
            <h3 className="text-xl font-semibold text-slate-600 mb-2">Kertas Coretan</h3>
            <div className="flex gap-2 mb-2 p-1 bg-slate-100 rounded-lg">
                <button 
                    onClick={() => setMode('DRAW')}
                    className={`${commonButtonClass} ${mode === 'DRAW' ? activeClass : inactiveClass}`}
                >
                    Menggambar
                </button>
                <button 
                    onClick={() => setMode('TYPE')}
                    className={`${commonButtonClass} ${mode === 'TYPE' ? activeClass : inactiveClass}`}
                >
                    Mengetik
                </button>
            </div>
            <div className="w-[350px] h-[350px] relative">
                {mode === 'DRAW' && (
                    <canvas
                        ref={canvasRef}
                        className="bg-white rounded-md shadow-md cursor-crosshair w-full h-full touch-none"
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        onMouseLeave={finishDrawing}
                        onTouchStart={startDrawing}
                        onTouchEnd={finishDrawing}
                        onTouchMove={draw}
                    />
                )}
                {mode === 'TYPE' && (
                    <textarea
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        placeholder="Ketik hitunganmu di sini..."
                        className="bg-white rounded-md shadow-md w-full h-full p-3 text-lg font-mono resize-none border-2 border-slate-200 focus:ring-2 focus:ring-sky-400 focus:outline-none text-red-600"
                    />
                )}
            </div>
            <button
                onClick={clearInputs}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-lg shadow-md border-b-4 border-red-700 active:border-b-0 active:translate-y-1 transition-all"
            >
                Hapus
            </button>
        </div>
    );
};

export default Scratchpad;