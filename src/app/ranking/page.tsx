"use client";

import { useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { useStoreUserEffect } from "@/features/users/api/storeUsers";
import Link from "next/link";

const RankingPage = () => {
    const users = useQuery(api.ranking.list) || [];
    const [searchTerm, setSearchTerm] = useState("");

    const sortedUsers = users.sort((a, b) => b.score - a.score).slice(0, 10);

    const filteredUsers = sortedUsers.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const { isLoading } = useStoreUserEffect();

    return (
        <div className="min-h-screen flex flex-col justify-start pt-16 items-center bg-[#c0c0c0] dark:bg-[#15202b] overflow-y-hidden">
            <Link href="/" className="flex gap-2 text-lg font-bold bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white p-3 rounded-full shadow-lg hover:scale-105 transform transition-all duration-200 ease-in-out my-8">
                Voltar para o jogo
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                </svg>
            </Link>
            <h1 className="text-3xl font-bold mb-6 text-center text-black dark:text-white">
                Pontuação
            </h1>
            {isLoading ? (
                <FullscreenLoader />
            ) : (
                <>
                    <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search-users"
                                className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Pesquise um jogador"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <table className="w-[600px] text-sm text-left rtl:text-right">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Melhor Pontuação</th>
                                <th scope="col" className="px-6 py-3">Posição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user, index) => {
                                const positionClass =
                                    index === 0
                                        ? "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-black"
                                        : index === 1
                                            ? "bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-black"
                                            : index === 2
                                                ? "bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-black"
                                                : "";

                                return (
                                    <tr
                                        key={user.id}
                                        className={`relative bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${positionClass} group`}
                                    >
                                        <th scope="row" className="flex items-center px-6 py-4 whitespace-nowrap">
                                            <img className="w-10 h-10 rounded-full" src={user.avatar} alt={user.name} />
                                            <div className="ps-3 shrink-0">
                                                <div className="text-base font-semibold truncate">{user.name}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">{user.score}</td>
                                        <td className="px-6 py-4">{index + 1}°</td>
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
