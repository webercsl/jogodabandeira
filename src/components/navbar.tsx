"use client"

import { ModeToggle } from "./ui/dark-mode-toggle"
import { Hint } from "@/components/hint"
import { useUser } from "@clerk/clerk-react";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";

export const Navbar = () => {
    const { user } = useUser();

    return (
        <nav className="flex justify-end items-center p-4 space-x-4 bg-[#c0c0c0] dark:bg-[#15202b] fixed w-full" style={{ boxShadow: "0 0 10px #000" }}>
            <Authenticated>
                <UserButton></UserButton>
                <span className="ml-2 font-bold">{user?.firstName}</span>
            </Authenticated>
            <Unauthenticated>
                <h2>Quer registrar sua pontuação no ranking?</h2>
                <SignInButton mode="modal"><span className="hover:underline cursor-pointer">Login</span></SignInButton>
            </Unauthenticated>
            <div className="flex space-x-4">
                <ModeToggle />
                <div className="flex space-x-4">
                    <Hint label="Alterar idioma para Português">
                        <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/58f45b60-cca3-4a20-944f-c846859957fe" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={32} alt="Idioma: Português" />
                    </Hint>
                    <Hint label="Alterar idioma para Espanhol">
                        <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/a3d46ebc-12ae-4d93-936b-61b792af2d3d" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={32} alt="Idioma: Espanhol" />
                    </Hint>
                    <Hint label="Alterar idioma para Inglês">
                        <img src="https://adventurous-tortoise-457.convex.cloud/api/storage/a2174f61-0400-4e28-affb-6767779dbcf7" className="cursor-pointer transform hover:scale-125 transition-transform duration-200" width={32} alt="Idioma: Inglês" />
                    </Hint>
                </div>
            </div>
        </nav>
    )
}