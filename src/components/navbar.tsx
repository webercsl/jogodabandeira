"use client";

import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

import { Hint } from "@/components/hint";
import { ModeToggle } from "./ui/dark-mode-toggle";
import { useStoreUserEffect } from "@/features/users/api/storeUsers";

import { useUser } from "@clerk/clerk-react";
import { UserButton, SignInButton } from "@clerk/nextjs";

export const Navbar = () => {
    const { user } = useUser();
    const { isAuthenticated } = useStoreUserEffect();

    // Busca os usuários do ranking
    const ranking = useQuery(api.ranking.list) || [];

    // Ordena o ranking por pontuação em ordem decrescente
    const sortedRanking = ranking.sort((a, b) => b.score - a.score);

    // Pega o primeiro colocado
    const topUser = sortedRanking[0];

    // Busca a posição e pontuação do jogador logado no ranking
    const loggedInUser = sortedRanking.find((u) => u.avatar === user?.imageUrl);
    const loggedInUserPosition = loggedInUser
        ? sortedRanking.indexOf(loggedInUser) + 1
        : undefined;

    return (
        <nav className="flex md:flex-row flex-col justify-between items-center p-2 md:space-x-4 bg-[#c0c0c0] dark:bg-[#15202b] fixed w-screen md:w-full" style={{ boxShadow: "0 0 10px #000" }}>
            <div className="flex items-center space-x-4">
                {topUser && (
                    <div className="mb-4 md:mb-0 flex items-center gap-3 text-xs md:text-lg font-bold bg-black text-yellow-400 border-2 border-yellow-500 p-1 rounded-xl shadow-lg">
                        <span className="text-lg md:text-3xl">T</span>
                        <span>
                            1° : <span className="text-white">{topUser.name}</span> -{" "}
                            <span className="text-white">{topUser.score} pontos</span>
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
                            <span className="text-sm font-bold bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black p-2 rounded-lg shadow-md">
                                Sua posição: {loggedInUserPosition}° : {loggedInUser.score} pontos
                            </span>
                        ) : (
                            <span className="text-sm font-bold text-black dark:text-white">
                                Pontuação não encontrada
                            </span>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Quer registrar sua pontuação no ranking?</h2>
                        <SignInButton mode="modal">
                            <span className="hover:underline cursor-pointer">Login</span>
                        </SignInButton>
                    </>
                )}
                <div className="hidden md:flex md:space-x-4">
                    <ModeToggle />
                    <div className="flex space-x-4">
                        <Hint label="Alterar idioma para Português">
                            <img
                                src="https://adventurous-tortoise-457.convex.cloud/api/storage/58f45b60-cca3-4a20-944f-c846859957fe"
                                className="cursor-pointer transform hover:scale-125 transition-transform duration-200"
                                width={32}
                                alt="Idioma: Português"
                            />
                        </Hint>
                        <Hint label="Alterar idioma para Espanhol (Em desenvolvimento)">
                            <img
                                src="https://adventurous-tortoise-457.convex.cloud/api/storage/a3d46ebc-12ae-4d93-936b-61b792af2d3d"
                                className="cursor-pointer transform hover:scale-125 transition-transform duration-200"
                                width={32}
                                alt="Idioma: Espanhol"
                            />
                        </Hint>
                        <Hint label="Alterar idioma para Inglês (Em desenvolvimento)">
                            <img
                                src="https://adventurous-tortoise-457.convex.cloud/api/storage/a2174f61-0400-4e28-affb-6767779dbcf7"
                                className="cursor-pointer transform hover:scale-125 transition-transform duration-200"
                                width={32}
                                alt="Idioma: Inglês"
                            />
                        </Hint>
                    </div>
                </div>
            </div>
        </nav>
    );
};
