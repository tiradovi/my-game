import React from 'react';

export default function PlayScreen({ playerName, hint, attempts, guess, setGuess, onGuess }) {
    return (
        <div className="space-y-6">
            <div className="text-center">
                <div className="text-4xl mb-2 grayscale">🤔</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{playerName}님</h3>
                <p className="text-gray-600">{hint}</p>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center border border-gray-200">
                <p className="text-gray-700 font-medium">시도 횟수: {attempts}</p>
            </div>

            <input
                type="number"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="숫자 입력 (1-100)"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 text-center text-2xl font-bold"
                onKeyPress={(e) => e.key === 'Enter' && onGuess()}
                min="1"
                max="100"
            />

            <button
                onClick={onGuess}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition"
            >
                확인
            </button>
        </div>
    );
}