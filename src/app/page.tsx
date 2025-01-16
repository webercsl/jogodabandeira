"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { FullscreenLoader } from "@/components/fullscreen-loader";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { DropdownMenuButton } from "@/components/dropdown-menu";

const Game = () => {
  const [gameState, setGameState] = useState<"start" | "countdown" | "playing" | "gameOver">("start");
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
  
  const updateUserScore = useMutation(api.ranking.update);
  const currentUserScore = useQuery(api.ranking.getScore);
  const flags = useQuery(api.flags.get);
  
  const scoreBanco = currentUserScore?.score;
  
  interface Flag {
    _id: string;
    nameEN: string;
    namePT: string;
    nameSP: string;
    image: string;
    continent: string;
  }

  const shuffleArray = (array: any[]): any[] => array.sort(() => Math.random() - 0.5);

  const startGame = () => {
    setGameState("countdown");
    setCountdown(3);
    setScore(0);
    setTotalScore(0);
    setTimeLeft(12);
    setUsedFlags([]);
  };

  const generateQuestion = () => {
    if (!flags) return;

    const unusedFlags = flags.filter((f) => !usedFlags.includes(f._id));
    if (unusedFlags.length === 0) {
      setGameState("gameOver");
      setTotalScore(score);
      return;
    }

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
    setOptions(shuffleArray([randomFlag.namePT, ...otherFlags.map((f) => f.namePT)]));

    setUsedFlags((prev) => [...prev, randomFlag._id]);
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

    if (gameState === "playing") {
      const timer = setInterval(() => {
        const elapsedTime = (Date.now() - startTime) / 1000;
        setTimeLeft((prev) => Math.max(0, prev - elapsedTime));
        startTime = Date.now();
      }, 100);

      return () => clearInterval(timer);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing" && timeLeft <= 0) {
      setGameState("gameOver");
      setTotalScore(score);
    }
  }, [gameState, timeLeft]);

  const handleAnswer = (answer: string) => {
    setSelectedOption(answer);
    const correct = answer === currentFlag?.namePT;
    setIsCorrect(correct);

    if (correct) {
      const bonusScore = Math.floor(timeLeft * 100);
      setScore((prev) => prev + 100 + bonusScore);
      setBonus(bonusScore);
    }

    setTimeout(() => {
      setSelectedOption(null);
      setIsCorrect(null);

        if (correct) {
          setTimeLeft(12);
          generateQuestion();
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

  if (flags === undefined) {
    return <FullscreenLoader />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#c0c0c0] dark:bg-[#15202b]">
      <Link href="/ranking" className="flex gap-2 text-lg font-bold bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out mb-16">
        Ver Ranking
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
        </svg>
      </Link>
      <div className="w-[600px] h-[600px] flex flex-col justify-center items-center">
        <nav className="mb-8 font-bold uppercase text-2xl relative w-full flex justify-center items-center">
          <h1>Adivinhe a bandeira</h1>
          <DropdownMenuButton />
        </nav>
        {gameState === "start" && (
            <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none relative">
            <img
              src="https://curious-fish-513.convex.cloud/api/storage/eef912e8-053b-42a9-b8c7-140f1e2d706f"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-50"
            />
            <Button variant="default" size="lg" onClick={startGame} className="relative z-10">
              Jogar
            </Button>
            </Card>
        )}

        {gameState === "countdown" && (
          <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
            <h1 className="text-4xl font-bold">
              {countdown > 0 ? countdown : "Começou!"}
            </h1>
          </Card>
        )}

        {gameState === "playing" && (
          <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
            <CardHeader>
              {currentFlag && (
                <Image
                  src={currentFlag.image}
                  alt={`Bandeira de ${currentFlag.namePT}`}
                  className="h-40 w-full object-contain"
                  width={255}
                  height={170}
                  priority
                  loading="eager"
                />
              )}
            </CardHeader>
            <CardContent className="w-72">
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
                    className="mb-2"
                    onClick={() => handleAnswer(option)}
                    disabled={selectedOption !== null}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <p>Tempo: {timeLeft.toFixed(1)}s</p>
                <p>Pontuação: {score}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {gameState === "gameOver" && (
          <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
            <CardHeader>
              <CardTitle className="text-4xl">Fim de Jogo!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">Pontuação Final: {totalScore}</p>
              <Button
                variant="default"
                size="lg"
                className="mt-4"
                onClick={startGame}
              >
                Jogar Novamente
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Game;
