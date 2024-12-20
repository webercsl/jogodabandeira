"use client";

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { FullscreenLoader } from "@/components/fullscreen-loader";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CircleAlert,
  EllipsisVertical,
  MessageCircle,
  CircleHelp,
  ChartNoAxesColumnDecreasing,
  Settings
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Game = () => {
  const [gameState, setGameState] = useState<"start" | "countdown" | "playing" | "gameOver">("start");
  const [countdown, setCountdown] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(12);
  const [currentFlag, setCurrentFlag] = useState<Flag | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState<number>(0);
  const [bonus, setBonus] = useState<number>(0);
  const [usedFlags, setUsedFlags] = useState<string[]>([]);
  const [totalScore, setTotalScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const flags = useQuery(api.flags.get);

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

      setTimeout(() => {
        if (correct) {
          setTimeLeft(12);
          generateQuestion();
        } else {
          setGameState("gameOver");
          setTotalScore(score);
        }
      }, 200); // Pequeno atraso para garantir que tudo é carregado
    }, 1000);
  };

  if (flags === undefined) {
    return <FullscreenLoader />;
  }

  console.log("Todas as bandeiras:", flags);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#c0c0c0] dark:bg-[#15202b]">
      <div className="w-[500px] h-[500px] flex flex-col justify-center items-center">
        <nav className="mb-8 font-bold uppercase text-2xl relative w-full flex justify-center items-center">
          <h1>Adivinhe a bandeira</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer hover:bg-slate-200/10 rounded-full p-2 h-10 w-10">
              <EllipsisVertical className="absolute right-2" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuItem className="cursor-pointer">
                <CircleHelp />
                <DropdownMenuLabel>Como jogar</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <ChartNoAxesColumnDecreasing />
                <DropdownMenuLabel>Ranking</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings />
                <DropdownMenuLabel>Configurações</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <CircleAlert />
                <DropdownMenuLabel>Créditos</DropdownMenuLabel>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <MessageCircle />
                <DropdownMenuLabel>Feedback</DropdownMenuLabel>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        {gameState === "start" && (
          <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
            <Button variant="default" size="lg" onClick={startGame}>
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
                <img
                  src={currentFlag.image}
                  alt={`Bandeira de ${currentFlag.namePT}`}
                  className="h-40 w-full object-contain"
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
