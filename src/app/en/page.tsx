"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { DropdownMenuButtonEnglish } from "@/components/dropdown-menu-english";
import { usePathname } from "next/navigation";

interface Flag {
    _id: string;
    nameEN: string;
    namePT: string;
    nameSP: string;
    image: string;
    continent: string;
}

const Game = () => {
    const [gameState, setGameState] = useState<"start" | "countdown" | "playing" | "answering" | "gameOver" | "finished">("start");
    const [countdown, setCountdown] = useState<number>(3);
    const [timeLeft, setTimeLeft] = useState<number>(12);
    const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
    const [options, setOptions] = useState<string[]>([]);
    const [bonus, setBonus] = useState<number>(0);
    const [usedFlags, setUsedFlags] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState<number>(0);
    const [totalScore, setTotalScore] = useState<number>(0);
    const [isFlagLoaded, setIsFlagLoaded] = useState(false);
    const [questionCount, setQuestionCount] = useState<number>(0);

    const { user } = useUser();

    const ranking = useQuery(api.ranking.list) || [];
    const updateUserScore = useMutation(api.ranking.update);
    const currentUserScore = useQuery(api.ranking.getScore);
    const flags = useQuery(api.flags.get);

    const totalFlags = flags?.length;

    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    const loggedInUser = sortedRanking.find((u) => u.avatar === user?.imageUrl);
    const loggedInUserPosition = loggedInUser
        ? sortedRanking.indexOf(loggedInUser) + 1
        : undefined;

    const scoreBanco = currentUserScore?.score;

    const pathname = usePathname();
    const basePath = pathname.split("/")[1];
    const rankingPath = `/${basePath}/ranking`;

    const shuffleArray = <T,>(array: T[]): T[] => array.sort(() => Math.random() - 0.5);

    const startGame = () => {
        setGameState("countdown");
        setCountdown(3);
        setScore(0);
        setTotalScore(0);
        setTimeLeft(12);
        setUsedFlags([]);
        setQuestionCount(0);
    };

    const generateQuestion = () => {
        if (!flags) return;

        const unusedFlags = flags?.filter((f) => !usedFlags.includes(f._id)) || [];

        const randomFlag = unusedFlags[Math.floor(Math.random() * unusedFlags.length)];

        const sameContinentFlags = flags.filter(
            (f) => f._id !== randomFlag._id && f.continent.toLowerCase() === randomFlag.continent.toLowerCase()
        );

        const otherFlags = shuffleArray(sameContinentFlags).slice(0, 3);
        if (otherFlags.length < 3) {
            const additionalFlags = shuffleArray(
                flags.filter((f) => !sameContinentFlags.includes(f) && f._id !== randomFlag._id)
            ).slice(0, 3 - otherFlags.length);
            otherFlags.push(...additionalFlags);
        }

        setCurrentFlag(randomFlag);
        setOptions(shuffleArray([randomFlag.nameEN, ...otherFlags.map((f) => f.nameEN)]));
        setUsedFlags((prev) => [...prev, randomFlag._id]);

        setQuestionCount((prev) => prev + 1);

        setIsFlagLoaded(false);
        const img = document.createElement('img');
        img.src = randomFlag.image;
        img.onload = () => setIsFlagLoaded(true);
    };


    useEffect(() => {
        if (gameState === "countdown" && countdown > 0) {
            const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
            return () => clearTimeout(timer);
        }

        if (gameState === "countdown" && countdown === 0) {
            setGameState("playing");
            generateQuestion();
        }
    }, [gameState, countdown]);

    useEffect(() => {
        let startTime = Date.now();

        if (gameState === "playing" && isFlagLoaded) {
            const timer = setInterval(() => {
                const elapsedTime = (Date.now() - startTime) / 1000;
                setTimeLeft((prev) => Math.max(0, prev - elapsedTime));
                startTime = Date.now();
            }, 100);

            return () => clearInterval(timer);
        }
    }, [gameState, isFlagLoaded]);

    useEffect(() => {
        const unusedFlags = flags?.filter((f) => !usedFlags.includes(f._id)) || [];

        if (gameState === "playing" && timeLeft <= 0) {
            setGameState((prev) => (prev === "playing" ? "gameOver" : prev));
            if (gameState === "playing") setTotalScore(score);
        }

        if (gameState === "answering" && unusedFlags.length === 0) {
            setTotalScore(score);
            setGameState("finished");
        }
    }, [gameState, timeLeft]);

    const handleAnswer = (answer: string) => {
        if (gameState !== "playing") return;

        setSelectedOption(answer);
        const correct = answer === currentFlag?.nameEN;
        setIsCorrect(correct);

        if (correct) {
            const bonusScore = Math.floor(timeLeft * 100);
            setScore((prev) => prev + 100 + bonusScore);
            setBonus(bonusScore);
        }

        setGameState("answering");

        setTimeout(() => {
            setSelectedOption(null);
            setIsCorrect(null);

            if (correct) {
                setTimeLeft(12);
                generateQuestion();
                setGameState("playing");
            } else {
                setGameState("gameOver");
                setTotalScore(score);
            }
        }, 1000);
    };

    useEffect(() => {
        if (gameState === "gameOver" && totalScore > (scoreBanco ?? 0)) {
            updateUserScore({ score: totalScore });
        }
    }, [gameState, totalScore, score, updateUserScore]);

    useEffect(() => {
        if (gameState === "finished" && totalScore > (scoreBanco ?? 0)) {
            updateUserScore({ score: totalScore });
        }
    }, [gameState, totalScore, score, updateUserScore]);

    if (flags === undefined) {
        return <FullscreenLoader />;
    }

    return (
        <div className="min-h-screen flex flex-col justify-start items-center bg-[#c0c0c0] dark:bg-[#15202b] md:pt-8 pb-20 overflow-x-hidden md:absolute md:top-16 md:-z-10 md:w-full">
            <Link href={rankingPath} className="flex gap-2 text-lg font-bold bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-white p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out m-4">
                Ranking
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
                </svg>
            </Link>
            <div className="w-[600px] h-[600px] flex flex-col justify-center items-center">
                <nav className="mb-8 font-bold uppercase text-2xl relative w-full flex justify-center items-center">
                    <h1>Guess the Flag</h1>
                    <DropdownMenuButtonEnglish />
                </nav>
                {gameState === "start" && (
                    <Card className="w-full h-full flex flex-col justify-end items-center bg-gray-400 dark:bg-[#1e2732] border-none relative rounded-2xl">
                        <img
                            src="/start.webp"
                            alt="Start screen"
                            className="absolute inset-0 w-full h-full object-cover opacity-40 rounded-2xl"
                        />
                        <img src="/logo.png" width={400} alt="Logo" className="absolute top-12 z-100"/>
                        <Button
                            size="lg"
                            onClick={startGame}
                            className="flex mb-12 gap-2 text-3xl font-bold bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl text-white p-8 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105"
                        >
                            Play
                        </Button>
                    </Card>
                )}

                {gameState === "countdown" && (
                    <Card
                        className="w-full h-full flex flex-col justify-center items-center bg-[#1e2732] text-white transition-all duration-500 ease-in-out"
                    >
                        <h1 className="text-4xl font-bold mb-4">
                            {countdown > 0
                                ? countdown === 3
                                    ? "Warm up..."
                                    : countdown === 2
                                        ? "Ready..."
                                        : "Go!"
                                : "Start!"}
                        </h1>
                        {countdown > 0 && (
                            <div
                                className={`text-6xl font-extrabold animate-bounce ${countdown === 1 ? "text-yellow-300" : "text-white"
                                    }`}
                            >
                                {countdown}
                            </div>
                        )}
                    </Card>
                )}

                {gameState === "playing" && (
                    <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
                        <div className="flex justify-between">
                            <p>Flags: {questionCount} / {totalFlags}</p>
                        </div>
                        <CardHeader>
                            {currentFlag && (
                                <img
                                    src={currentFlag.image}
                                    alt={`Flag from ${currentFlag.nameEN}`}
                                    className="h-40 w-full object-contain"
                                    onLoad={() => setIsFlagLoaded(true)}
                                />
                            )}
                        </CardHeader>
                        <CardContent className="w-72">
                            {isFlagLoaded ? (
                                <div className="flex flex-col mt-4">
                                    {options.map((option) => (
                                        <Button
                                            key={option}
                                            variant={
                                                selectedOption === option
                                                    ? isCorrect
                                                        ? "correct"
                                                        : "wrong"
                                                    : "outline"
                                            }
                                            className="mb-2 bg-[#131313] hover:bg-[#131313] md:hover:bg-[#3d4c5e]"
                                            onClick={() => handleAnswer(option)}
                                            disabled={selectedOption !== null}
                                        >
                                            {option}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
                                    <Loader />
                                </div>
                            )}
                            <Separator className="my-4" />
                            <div className="flex justify-between">
                                <p>Time: {timeLeft.toFixed(1)}s</p>
                                <p>Score: {score}</p>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {gameState === "answering" && (
                    <Card
                        className="w-full h-full flex justify-center items-center bg-[#1e2732] transition-all duration-500 ease-in-out"
                    >
                        <div className="text-center flex items-center space-x-4">
                            {isCorrect ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="green"
                                    className="h-10 w-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="red"
                                    className="h-10 w-10"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                            <h1 className="text-4xl font-bold text-white">
                                {isCorrect ? "Correct!" : "Incorrect!"}
                            </h1>
                        </div>
                    </Card>
                )
                }

                {
                    gameState === "gameOver" && (
                        <Card className="w-full h-full flex flex-col justify-end items-center bg-gray-400 dark:bg-[#1e2732] border-none relative">
                            <img
                                src="https://curious-fish-513.convex.cloud/api/storage/708d6c30-b315-4620-a7b0-a7e5146831f8"
                                alt="Background"
                                className="absolute inset-0 w-full h-full object-cover opacity-50 rounded-2xl"
                            />
                            <CardHeader className="relative z-10">
                                <CardTitle className="text-4xl">Game Over!</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center relative z-10">
                                <p className="text-lg">Final Score: {totalScore}</p>
                                <Button
                                    variant="default"
                                    size="lg"
                                    className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                    onClick={startGame}
                                >
                                    Play Again
                                </Button>
                                {loggedInUser ? (
                                    <p className="mt-4 text-center text-sm font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black py-2 px-4 rounded-lg shadow-md">
                                        Ranking position: {loggedInUserPosition}°
                                    </p>
                                ) : (
                                    <span className="text-sm font-bold text-black dark:text-white">
                                        Score not recorded
                                    </span>
                                )}

                                {/* Botões de compartilhamento */}
                                <div className="mt-4">Share with friends</div>
                                <div className="mt-2 flex gap-4">
                                    <Button
                                        className="text-white px-0 py-2 rounded-lg cursor-pointer bg-transparent hover:bg-transparent w-18 transform transition-transform duration-100 hover:scale-110 ease-linear"
                                        onClick={() => {
                                            const message = `I just scored ${totalScore} points in this amazing game! Can you beat me? Play now! https://jogodabandeira.com.br/`;
                                            window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
                                        }}
                                    >
                                        <img src="/whatsapp.png" width={40} height={40} alt="Whatsapp Icon" />
                                    </Button>
                                    <Button
                                        className="text-white px-0 py-2 rounded-lg cursor-pointer bg-transparent hover:bg-transparent w-18 transform transition-transform duration-100 hover:scale-110 ease-linear"
                                        onClick={() => {
                                            const url = `https://jogodabandeira.com.br/`;
                                            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                                        }}
                                    >
                                        <img src="/facebook.png" width={40} height={40} alt="Facebook Icon" />
                                    </Button>
                                    <Button
                                        className="text-white px-0 py-2 rounded-lg cursor-pointer bg-transparent hover:bg-transparent w-18 transform transition-transform duration-100 hover:scale-110 ease-linear"
                                        onClick={() => {
                                            const message = `I just scored ${totalScore} points in this amazing game! Can you beat me? Play now!`;
                                            const url = `https://jogodabandeira.com.br/`;
                                            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`, '_blank');
                                        }}
                                    >
                                        <img src="/twitter.png" width={40} height={40} alt="X / Twitter Icon" />
                                    </Button>
                                    <Button
                                        className="bg-gray-500/30 text-white px-2 py-2 rounded-lg hover:bg-gray-600/30"
                                        onClick={() => {
                                            const url = `https://jogodabandeira.com.br/`;
                                            navigator.clipboard.writeText(url);
                                            alert('Link copied to clipboard!');
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                                        </svg>
                                        Copy Link
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    )
                }


                {gameState === "finished" && (
                    <Card className="w-full h-full flex flex-col justify-end items-center bg-gradient-to-b from-gray-400 via-gray-500 to-gray-600 dark:bg-gradient-to-b dark:from-[#1e2732] dark:via-[#2a3b48] dark:to-[#1e2732] border-none relative rounded-2xl overflow-hidden shadow-lg">
                        <img
                            src="/gg.webp"
                            alt="Background"
                            className="absolute inset-0 w-full h-full object-cover opacity-20"
                        />
                        <CardHeader className="relative z-10 text-center">
                            <CardTitle className="text-5xl text-[#e7f2ff] font-extrabold">Congratulations!</CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center z-10 text-center text-white px-4 py-6 w-[320px]">
                            <h1 className="text-2xl font-bold mb-2">You hit all the flags!</h1>
                            <h3 className="text-lg mb-4">Want to improve your score?<br /> Be even faster!</h3>
                            <p className="text-2xl font-extrabold text-amber-400">Final Score: {totalScore}</p>
                            <Button
                                variant="default"
                                size="lg"
                                className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                                onClick={startGame}
                            >
                                Play Again
                            </Button>
                        </CardContent>
                    </Card>
                )}

            </div >
        </div >
    );
};

export default Game;
