"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { useStoreUserEffect } from "@/features/users/api/storeUsers";
import Link from "next/link";
import { useUser } from "@clerk/clerk-react";

const RankingPage = () => {
    const users = useQuery(api.ranking.list) || [];
    const [searchTerm, _setSearchTerm] = useState("");
    const { user } = useUser();
    
    const sortedUsers = users.sort((a, b) => b.score - a.score);

    const loggedInUser = sortedUsers.find((u) => u.avatar === user?.imageUrl);

    const top10Users = sortedUsers.slice(0, 10);

    const isUserInTop10 = loggedInUser && top10Users.includes(loggedInUser);

    const displayedUsers = [...top10Users];
    if (loggedInUser && !isUserInTop10) {
        displayedUsers.push(loggedInUser);
    }

    const filteredUsers = displayedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { isLoading } = useStoreUserEffect();

    return (
        <div className="min-h-screen flex flex-col justify-start items-center bg-[#c0c0c0] dark:bg-[#15202b] overflow-y-hidden md:pt-20 pt-40">
            <Link href="/" className="flex items-center gap-2 text-lg font-bold bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl text-black p-3 rounded-lg shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out m-4">
                Voltar para o jogo
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
                Ranking
            </h1>
            {isLoading ? (
                <FullscreenLoader />
            ) : (
                <>
                    <table className="w-[200px] md:w-[600px] text-sm text-left rtl:text-right">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="md:px-6 px-2 py-3">Nome</th>
                                <th scope="col" className="px-0 py-3 max-w-[40px] md:max-w-none text-center">Melhor Pontuação</th>
                                <th scope="col" className="px-4 py-3 text-center">Posição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, _index) => {
                                const realPosition = sortedUsers.indexOf(user) + 1;

                                const positionClass =
                                    realPosition === 1
                                        ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black"
                                        : realPosition === 2
                                            ? "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black"
                                            : realPosition === 3
                                                ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-black"
                                                : "";

                                const isLoggedUser = user.avatar === loggedInUser?.avatar;
                                const loggedUserClass = isLoggedUser
                                    ? "transform scale-110"
                                    : "";

                                return (
                                    <tr
                                        key={user.id}
                                        className={`relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${positionClass} ${loggedUserClass} group`}
                                        style={{ zIndex: isLoggedUser ? 1000 : 'auto' }}
                                    >
                                        <th scope="row" className="flex items-center md:px-6 px-2 py-4 whitespace-nowrap">
                                            <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.name} />
                                            <div className="ps-3 shrink-0 w-auto">
                                                <div className="text-base font-semibold truncate max-w-[100px] md:max-w-none pr-12">{user.name}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4 text-center">{user.score}</td>
                                        <td className="px-6 py-4 text-center">{realPosition}°</td>
                                        <td className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-reflection"></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default RankingPage;
