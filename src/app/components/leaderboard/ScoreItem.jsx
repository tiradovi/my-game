import React from 'react';

export default function ScoreItem({ score, index }) {
    const isTopRank = index < 3;

    return (
        <div className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-4">
        <span className={`text-lg w-6 text-center ${isTopRank ? 'font-black text-gray-900' : 'text-gray-400'}`}>
          {index + 1}
        </span>
                <div>
                    <p className={`text-gray-800 ${isTopRank ? 'font-bold' : 'font-medium'}`}>
                        {score.name}
                    </p>
                    <p className="text-xs text-gray-400">
                        {new Date(score.date || score.createdAt).toLocaleDateString('ko-KR')}
                    </p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-gray-900">{score.attempts}회</p>
            </div>
        </div>
    );
}