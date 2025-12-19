import React from 'react';
import { Trophy } from 'lucide-react';
import ScoreItem from './ScoreItem';

export default function Leaderboard({ scores }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 h-full">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <Trophy className="text-gray-400" size={24} />
                <h2 className="text-xl font-bold text-gray-900">순위표</h2>
            </div>

            {scores.length === 0 ? (
                <div className="text-center text-gray-400 py-12">
                    <p>아직 기록이 없습니다.</p>
                </div>
            ) : (
                <div className="space-y-1">
                    {scores.map((score, index) => (
                        <ScoreItem key={index} score={score} index={index} />
                    ))}
                </div>
            )}
        </div>
    );
}