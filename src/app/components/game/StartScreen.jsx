import {Play} from "lucide-react";

export default function StartScreen({playerName, setPlayerName, onStart}) {
    return (
        <div className="text-center space-y-6">
            <div className="text-6xl mb-4 grayscale">🎲</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">게임시작</h2>
            <p className="text-gray-500 mb-6">
                1부터 100 사이의 숫자를 맞춰보세요.
            </p>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="이름을 입력하세요."
                suppressContentEditableWarning={true}
                className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold focus:outline-none focus:border-gray-800 focus:ring-1 focus:ring-gray-800 mb-4 transition-colors"/>
            <button onClick={onStart}
                    className="w-full bg-gray-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-gray-700 transition flex items-center justify-center gap-2">
                <Play size={24}>
                    시작하기
                </Play>
            </button>
        </div>
    )
}