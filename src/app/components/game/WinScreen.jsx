import React from 'react';
import { RotateCcw } from 'lucide-react';

export default function WinScreen({ hint, targetNumber, loading, onReset }) {
    return (
        <div className="text-center space-y-6">
            <div className="text-6xl mb-4 grayscale">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">정답입니다.</h2>
            <p className="text-gray-600 text-lg mb-4">{hint}</p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                <p className="text-gray-900 font-bold text-xl">
                    정답: {targetNumber}
                </p>
            </div>

            {loading ? (
                <p className="text-gray-400 text-sm">기록 저장 중...</p>
            ) : (
                <p className="text-gray-500 text-sm">기록이 저장되었습니다.</p>
            )}

            <button
                onClick={onReset}
                className="w-full border-2 border-gray-900 text-gray-900 py-4 rounded-lg font-bold text-lg hover:bg-gray-900 hover:text-white transition flex items-center justify-center gap-2"
            >
                <RotateCcw size={24} />
                다시 하기
            </button>
        </div>
    );
}