"use client";

import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";
import { useStoreUserEffect } from "@/features/users/api/storeUsers";
import { useUser } from "@clerk/clerk-react";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Hint } from "./hint";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export const Navbar = () => {
    const { user } = useUser();
    const { isAuthenticated } = useStoreUserEffect();
    const ranking = useQuery(api.ranking.list) || [];
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);
    const topUser = sortedRanking[0];
    const loggedInUser = sortedRanking.find((u) => u.avatar === user?.imageUrl);
    const loggedInUserPosition = loggedInUser ? sortedRanking.indexOf(loggedInUser) + 1 : undefined;
    const totalPlayers = Math.floor(Math.random() * 31) + 20;
    const pathname = usePathname();
    const [randomNumber, setRandomNumber] = useState<number | null>(null);

    useEffect(() => {
        const generateRandomNumber = () => {
            return Math.floor(Math.random() * (50 - 20 + 1)) + 20;
        };

        setRandomNumber(generateRandomNumber());
    }, []);

    const rankingScore: { [key: string]: string } = {
        "/pt/": "Quer registrar sua pontuação no ranking?",
        "/sp/": "¿Quieres registrar tu puntuación de clasificación?",
        "/en/": "Want to record your ranking score?",
        "/pt/ranking": "Quer registrar sua pontuação no ranking?",
        "/sp/ranking": "¿Quieres registrar tu puntuación de clasificación?",
        "/en/ranking": "Want to record your ranking score?"
    };

    const userPosition: { [key: string]: string } = {
        "/pt": "Sua posição:",
        "/sp": "Tu posición:",
        "/en": "Your position:",
        "/pt/ranking": "Sua posição:",
        "/sp/ranking": "Tu posición:",
        "/en/ranking": "Your position:"
    };

    const userScore: { [key: string]: string } = {
        "/pt": " pontos",
        "/sp": " puntos",
        "/en": " points",
        "/pt/ranking": " pontos",
        "/sp/ranking": " puntos",
        "/en/ranking": " points"
    };

    return (
        <nav className="flex md:flex-row flex-col justify-between items-center p-2 md:space-x-2 bg-[#c0c0c0] dark:bg-[#15202b] md:h-16 w-screen md:w-full relative md:z-10000 md:fixed md:top-0" style={{ boxShadow: "0 0 10px #000" }}>
            <div className="flex items-center space-x-4">
                {topUser && (
                    <div className="mb-2 md:mb-0 flex items-center gap-3 text-sm md:text-lg font-bold bg-black text-yellow-400 border-2 border-yellow-500 p-1 rounded-xl shadow-lg">
                        <span className="w-6"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACHElEQVR4nO2YO4vVQBSAP8VX56rdCouFleAfsFF/gIWFna5a24qvRkEESx//wFJY7ETuOTGIWoiLnYha+QALH7mambu6qzsSV+FuMNeb3GQSYT4YuORC5nwz58wjEAgEAp3EKq6ovT/bTLMj+gwCNswA7aYQY9bHJI0x+w8CNswAI1PIxawbfm6EpdIpZJRvwy9xN9ngqwYWYnbkBN5WEXg1/JJU2O1LwConcv/F5QWEW6tGQbnmQyCJmTLK61V9R5wsLxBxJCfw3SoHmxRIYqascDfXr7U9pksLuHnWG+VFXsII15sSMLmR/90uUpVU2GeExaYCtv8SEh4MLx6VMMJsGxJGuPdZ2EYdDHrsNcpzL4ErNkubiUf+bzWRKoeNMpcKy7UHLyxlq02lgi1LQ7PxrPHAi/aImlJnzp9AxPEGinbWm0D/Dlut0q8x/5NsE8MnRjlXY/qcwjcuZpNRHteQOo+yd9EGVtluhDf5oMa985rs6OBj2Rwp0WM6G8UKAk8Gwgxd4Fc6CWf+FPZIASHJct7dZiNdo3+fLUY5llzBfbyE+3BhpWW/s2dGOOp9talCUcHyv2CDQIs4x5qiGXDnWUuXWYjZmb/T5jath1+UXXQNt3J/Pm2Ur2PsvItWuNyZZXQQsccKTyscIV6myv7WAv8kbDbKVaP8mOActGyFG9np1mvwVjlQ8Amk6nH63SDikFeJQCAQoA5+Aj1lk4ad5d4kAAAAAElFTkSuQmCC" alt="trophy" /></span>
                        <span>
                            1° : <span className="text-white">{topUser.name}</span> -{" "}
                            <span className="text-white">{topUser.score} {userScore[pathname] || userScore["/pt"]}</span>
                        </span>
                    </div>
                )}
            </div>
            <div className="gap-4 flex flex-col md:flex-row items-center md:space-x-4">
                {isAuthenticated ? (
                    <>
                        <div className="flex items-center space-x-2">
                            <UserButton />
                            <span className="ml-2 font-bold">{user?.firstName}</span>
                        </div>
                        {loggedInUser ? (
                            <span className="text-sm font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black p-2 rounded-lg shadow-md flex gap-2 items-center">
                                <img width="24" height="24" src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-videogame-web-store-flaticons-lineal-color-flat-icons.png" alt="videogame" />
                                <span>{userPosition[pathname] || userPosition["/pt"]} {loggedInUserPosition}° : {loggedInUser.score} {userScore[pathname] || userScore["/pt"]}</span>
                            </span>
                        ) : (
                            <span className="text-sm font-bold text-black dark:text-white">Pontuação não encontrada</span>
                        )}
                    </>
                ) : (
                    <>
                        <h2>{rankingScore[pathname] || rankingScore["/pt"]}</h2>
                        <SignInButton mode="modal">
                            <span className="hover:underline cursor-pointer md:pr-6">Login</span>
                        </SignInButton>
                    </>
                )}
                <div className="flex space-x-4">
                    <Hint label="Português">
                        <Link href="/pt">
                            <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/58f45b60-cca3-4a20-944f-c846859957fe" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={48} alt="Português" />
                        </Link>
                    </Hint>
                    <Hint label="Espanhol">
                        <Link href="/sp">
                            <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/a3d46ebc-12ae-4d93-936b-61b792af2d3d" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={48} alt="Espanhol" />
                        </Link>
                    </Hint>
                    <Hint label="Inglês">
                        <Link href="/en">
                            <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/a2174f61-0400-4e28-affb-6767779dbcf7" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={48} alt="Inglês" />
                        </Link>
                    </Hint>
                </div>
            </div>
        </nav>
    );
};
