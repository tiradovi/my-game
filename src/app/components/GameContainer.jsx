"use client"; // 웹페이지의 경우 클라이언트 웹사이트로 설정 DocType과 유사
// @ 절대 경로 : @=프로젝트에서 어떤위치에 있는 파일 사용하겠다.
import React, {useEffect, useState} from "react";
import WinScreen from "@/app/components/game/WinScreen";
import Leaderboard from "@/app/components/leaderboard/Leaderboard";
import PlayScreen from "@/app/components/game/PlayScreen";
import StartScreen from "@/app/components/game/StartScreen";
import {GameAPI} from "@/lib/apiService";

export default function GameContainer() {
    const [gameState, setGameState] = useState('start');
    const [targetNumber, setTargetNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [attempts, setAttempts] = useState(0);
    const [hint, setHint] = useState('');
    const [playerName, setPlayerName] = useState('');
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    // DB에 저장된 점수 보드 가져와 사람들의 점수들 확인하기
    const loadLeaderboard = async () => {
        const scores = await GameAPI.getScores();
        setLeaderboard(scores);
    }

    useEffect(() => {
        loadLeaderboard();
    }, []);

    const startGame = () => {
        if (!playerName.trim()) {
            alert("이름을 입력해주세요.");
            return;
        }
        const random = Math.floor(Math.random() * 100) + 1;
        setTargetNumber(random);
        setGameState('playing');
        setAttempts(0);
        setGuess('');
        setHint('1과 100 사이의 숫자를 맞춰보세요')
    }

    const makeGuess = () => {
        const num = parseInt(guess);
        if (isNaN(num) || num < 1 || num > 100) {
            setHint('1과 100 사이의 숫자를 입력하세요.');
            return;
        }
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        if (num === targetNumber) {
            setHint(`${newAttempts}번 만에 맞추셨습니다.`);
            setGameState('won');
            saveScore(newAttempts);
        } else if (num < targetNumber) {
            setHint(`${num}보다 큽니다. (시도 : ${newAttempts})`);
        } else {
            setHint(`${num}보다 작습니다. (시도 : ${newAttempts})`);
        }

        setGuess('');
    }

    const saveScore = async (finalAttempts) => {
        setLoading(true);
        try {
            await GameAPI.saveScore(playerName, finalAttempts);
            await loadLeaderboard();
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const resetGame = () => {
        setGameState('start');
        setGuess('');
        setHint('');
        setAttempts(0);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8 mt-4 tracking-tight">
                    숫자 맞추기
                </h1>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                    {/* 게임 영역 */}
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8">
                        {gameState === 'start' && (
                            <StartScreen
                                playerName={playerName}
                                setPlayerName={setPlayerName}
                                onStart={startGame}
                            />
                        )}

                        {gameState === 'playing' && (
                            <PlayScreen
                                playerName={playerName}
                                hint={hint}
                                attempts={attempts}
                                guess={guess}
                                setGuess={setGuess}
                                onGuess={makeGuess}
                            />
                        )}

                        {gameState === 'won' && (
                            <WinScreen
                                hint={hint}
                                targetNumber={targetNumber}
                                loading={loading}
                                onReset={resetGame}
                            />
                        )}
                    </div>

                    <Leaderboard scores={leaderboard}/>
                </div>

                <div className="text-center mt-12 text-gray-400 text-xs">
                    <p>데이터는 PostgreSQL DB에 저장됩니다.</p>
                </div>
            </div>
        </div>
    );
}