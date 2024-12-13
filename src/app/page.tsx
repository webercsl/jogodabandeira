"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";
import { UserButton, SignInButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import { FullscreenLoader } from "@/components/fullscreen-loader";
import { useUser } from "@clerk/clerk-react";


const Home = () => {
  const { user } = useUser();

  const flags = useQuery(api.flags.get);

  if (flags === undefined) {
    return (
      <FullscreenLoader />
    )
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Authenticated>
        <UserButton />
        Logged in as {user?.fullName}
      </Authenticated>
      <Unauthenticated>
        <SignInButton mode="modal" />
      </Unauthenticated>
      <h1 className="py-10">Salve mano joia</h1>
      <Button>Não clique aqui</Button>
      Clique <Link href="/profile/manojoia"><span className="text-blue-500 font-bold">Aqui</span></Link> para ver perfil do jogador
      {flags?.map((flag) => (
        <div>
          <span key={flag._id}>{flag.nameEN}</span>
          <img src={flag.image} alt={flag.namePT} />
        </div>
      ))}
    </div>
  );
}

export default Home;