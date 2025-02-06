"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState, useEffect } from "react";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { DropdownMenuButton } from "@/components/dropdown-menu";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";

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

  const { user } = useUser();

  const ranking = useQuery(api.ranking.list) || [];
  const updateUserScore = useMutation(api.ranking.update);
  const currentUserScore = useQuery(api.ranking.getScore);
  const flags = useQuery(api.flags.get);

  const sortedRanking = ranking.sort((a, b) => b.score - a.score);
  const loggedInUser = sortedRanking.find((u) => u.avatar === user?.imageUrl);
  const loggedInUserPosition = loggedInUser
    ? sortedRanking.indexOf(loggedInUser) + 1
    : undefined;

  const scoreBanco = currentUserScore?.score;

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
    setOptions(shuffleArray([randomFlag.namePT, ...otherFlags.map((f) => f.namePT)]));
    setUsedFlags((prev) => [...prev, randomFlag._id]);

    // Resetar estado de carregamento e pré-carregar a bandeira
    setIsFlagLoaded(false);
    const img = document.createElement('img');
    img.src = randomFlag.image;
    img.onload = () => setIsFlagLoaded(true); // Marca a bandeira como carregada
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
      setTotalScore(score); // Adiciona o score final
      setGameState("finished");
  }
  }, [gameState, timeLeft]);

  const handleAnswer = (answer: string) => {
    if (gameState !== "playing") return; // Previne alterações fora do estado "playing"

    setSelectedOption(answer);
    const correct = answer === currentFlag?.namePT;
    setIsCorrect(correct);

    if (correct) {
      const bonusScore = Math.floor(timeLeft * 100);
      setScore((prev) => prev + 100 + bonusScore);
      setBonus(bonusScore);
    }

    setGameState("answering"); // Adiciona um estado intermediário para prevenir conflitos

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
    <div className="min-h-screen flex flex-col justify-start items-center bg-[#c0c0c0] dark:bg-[#15202b] md:pt-20 pt-40">
      <Link href="/ranking" className="flex gap-2 text-lg font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl text-black p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out m-4">
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
            <Button size="lg" onClick={startGame} className="flex gap-2 text-3xl font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl text-black p-8 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out">
              Jogar
            </Button>
          </Card>
        )}

        {gameState === "countdown" && (
          <Card
            className="w-full h-full flex flex-col justify-center items-center 
      bg-[#1e2732] text-white transition-all duration-500 ease-in-out"
          >
            <h1 className="text-4xl font-bold mb-4">
              {countdown > 0
                ? countdown === 3
                  ? "Aquecendo..."
                  : countdown === 2
                    ? "Preparar..."
                    : "Vai começar!"
                : "Começou!"}
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
            <CardHeader>
              {currentFlag && (
                <img
                  src={currentFlag.image}
                  alt={`Bandeira de ${currentFlag.namePT}`}
                  className="h-40 w-full object-contain"
                  onLoad={() => setIsFlagLoaded(true)} // Garantia adicional para carregar
                />
              )}
            </CardHeader>
            <CardContent className="w-72">
              {isFlagLoaded ? ( // Só renderiza as opções se a bandeira estiver carregada
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
              ) : (
                <div className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
                  <Loader />
                </div> // Mostra um loader ou texto temporário
              )}
              <Separator className="my-4" />
              <div className="flex justify-between">
                <p>Tempo: {timeLeft.toFixed(1)}s</p>
                <p>Pontuação: {score}</p>
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
                {isCorrect ? "Correto!" : "Errado!"}
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
                <CardTitle className="text-4xl">Fim de Jogo!</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center relative z-10">
                <p className="text-lg">Pontuação Final: {totalScore}</p>
                <Button
                  variant="default"
                  size="lg"
                  className="mt-4 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  onClick={startGame}
                >
                  Jogar Novamente
                </Button>
                {loggedInUser ? (
                  <p className="mt-8 text-center text-sm font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black py-2 px-4 rounded-lg shadow-md">
                    Posição no ranking: {loggedInUserPosition}°
                  </p>
                ) : (
                  <span className="text-sm font-bold text-black dark:text-white">
                    🚫 Pontuação não encontrada
                  </span>
                )}
              </CardContent>
            </Card>
          )
        }

        {gameState === "finished" && (
          <Card className="w-full h-full flex flex-col justify-center items-center bg-gray-400 dark:bg-[#1e2732] border-none">
            <CardHeader>
              <CardTitle className="text-4xl">Você acertou todas as bandeiras!</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center">
              <p className="text-lg">Pontuação Final: {totalScore}</p>
              <Button onClick={startGame}>Jogar Novamente</Button>
            </CardContent>
          </Card>
        )}
      </div >
    </div >
  );
};

export default Game;
