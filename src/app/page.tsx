"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import Link from "next/link";
import { api } from "../../convex/_generated/api";

const Home = () => {

  return ( 
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="py-10">Salve mano joia</h1>
      <Button>Não clique aqui</Button>
      Clique <Link href="/profile/manojoia"><span className="text-blue-500 font-bold">Aqui</span></Link> para ver perfil do jogador
    </div>
  );
}

export default Home;